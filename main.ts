basic.forever(function () {
    Motor.motor(Motorlist.M1, Direction1.Backward, 255)
    Motor.motor(Motorlist.M2, Direction1.Forward, 255)
    Motor.led_rgb(
    LED_rgb_L_R.LED_R,
    0,
    0,
    0
    )
    basic.pause(1000)
    Motor.led_rgb(
    LED_rgb_L_R.LED_L,
    0,
    0,
    0
    )
    Motor.motor(Motorlist.M1, Direction1.Forward, 255)
    Motor.motor(Motorlist.M2, Direction1.Backward, 255)
    basic.pause(1000)
})
