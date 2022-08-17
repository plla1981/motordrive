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
 * 1.使用 STC8G1K08 用硬件I2C模拟从机
 * 2.用定时器0模拟4路PWM输出
 *
 * 主机每次只能写两个字节数据
 * 第一个数据用于配置PWM引脚
 * 第二个数据用于配置PWM值
 *
 * @HTTP:https://github.com/plla1981
 *
 *                     license The MIT License (MIT)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the 'Software'), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 *
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
    //% block="M1"
    M1 = 1,
    //% block="M2"
    M2 = 2
}

enum Direction1 
{
    //% block="Forward"
    Forward = 1,
    //% block="Backward"
    Backward = 0
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

    function motor_i2cWrite(reg: number, value: number) 
    {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(address, buf)
    }
}