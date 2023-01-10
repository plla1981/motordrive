/*
 * @Author: Plla 1183136570@qq.com
 * @Date: 2022-06-14 11:33:47
 * @LastEditors: Plla 1183136570@qq.com
 * @LastEditTime: 2022-06-15 14:04:23
 * @FilePath: 
 * @Description:
 *
 * 本代码为I2C主机程序
 * 通过4通道PWM控制电机
 * 
 * I2C从机部分：
 * 1.使用 STC8G1K08A 用硬件I2C模拟从机
 * 2.用定时器0模拟4路PWM输出
 *
 * 主机每次只能写两个字节数据
 * 第一个数据用于配置PWM引脚
 * 第二个数据用于配置PWM值
 *
 * @HTTP:https://github.com/plla1981
 *
 * license The MIT License (MIT)
 *
 * Version:
 *
 * v0.0.1: 2022.06.15, Initial version.
 *
 * Copyright (c) 2022 by Plla 1183136570@qq.com, All Rights Reserved.
 */


let address = 0x30

enum Motorlist 
{
    //% block="A"
    M1 = 1,
    //% block="B"
    M2 = 2
}

enum Direction1 
{
    //% block="Forward"
    Forward = 1,
    //% block="Backward"
    Backward = 0
}

enum LED_rgb_L_R {
    //% bolck="LED_R"
    LED_R = 1,
    //% bolck="LED_L"
    LED_L = 0,
}

//% color="#AA278D"
namespace Motor {

    //% block="motor = | %motor Direction = | $direction speed = $pwmvalue"
    //% direction.shadow=timePicker
    //% pwmvalue.min=0 pwmvalue.max=255
    //% pwmvalue.shadow=turnRatioPicker
    
    export function motor(motor: Motorlist, direction: Direction1, pwmvalue: number) {
        switch(motor){
            case 1: // M1电机控制
                if (direction) { motor_i2cWrite(0x01, 255-pwmvalue); motor_i2cWrite(0x02, 255);}
                else { motor_i2cWrite(0x02, 255-pwmvalue); motor_i2cWrite(0x01, 255); }
                break;
            case 2: // M2电机控制
                if (direction) { motor_i2cWrite(0x03, 255-pwmvalue); motor_i2cWrite(0x04, 255); }
                else { motor_i2cWrite(0x04, 255-pwmvalue); motor_i2cWrite(0x03, 255); }
                break;
        }
    }
    
    //% block="RGB = %place rad   = $arg1 green =$arg2 blue  = $arg3"
    //% direction.shadow=timePicker
    //% pwmvalue.min=0 pwmvalue.max=1 
    export function led_rgb(place: LED_rgb_L_R, arg1: number, arg2: number, arg3: number) {
        switch (place) {
            case 0: { motor_i2cWrite(0x09, arg1); motor_i2cWrite(0x0a, arg2); motor_i2cWrite(0x0b, arg3); }
                break;
            case 1: { motor_i2cWrite(0x0c, arg1); motor_i2cWrite(0x0d, arg2); motor_i2cWrite(0x0e, arg3); }
                break;
        }

    }

    function motor_i2cWrite(reg: number, value: number) 
    {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(address, buf)
    }
}