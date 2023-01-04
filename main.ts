input.onButtonPressed(Button.A, function () {
    is_joystik = 0
    basic.showLeds(`
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        . . . . .
        `)
})
input.onButtonPressed(Button.B, function () {
    is_joystik = 1
    basic.showLeds(`
        . . . . .
        . # # # .
        # # # # #
        # # . # #
        . . . . .
        `)
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("beep")
})
let speed_left_motor = 0
let speed_right_motor = 0
let speed_right = 0
let speed_fwd = 0
let is_joystik = 0
is_joystik = 0
basic.showLeds(`
    . . . . .
    . # # # .
    . # # # .
    . # # # .
    . . . . .
    `)
radio.setGroup(111)
basic.forever(function () {
    if (GHBit.Rocker(GHBit.enRocker.Press)) {
        radio.sendString("beep")
    }
    if (GHBit.Button(GHBit.enButton.B4, GHBit.enButtonState.Press)) {
        radio.sendString("beep")
    }
})
loops.everyInterval(250, function () {
    if (is_joystik == 0) {
        speed_fwd = Math.round(input.acceleration(Dimension.Y) / -15.1)
        if (speed_fwd > -21.1 && speed_fwd < 21.1) {
            speed_fwd = 0
        }
        speed_right = Math.round(input.acceleration(Dimension.X) / 30.69)
        if (speed_right > -7 && speed_right < 7) {
            speed_right = 0
        }
    } else if (is_joystik == 1) {
        if (GHBit.Rocker(GHBit.enRocker.Up)) {
            speed_fwd = 66
            speed_right = 0
        }
        if (GHBit.Rocker(GHBit.enRocker.Nostate)) {
            speed_fwd = 0
            speed_right = 0
        }
        if (GHBit.Rocker(GHBit.enRocker.Down)) {
            speed_fwd = -66
            speed_right = 0
        }
        if (GHBit.Rocker(GHBit.enRocker.Right)) {
            speed_fwd = 0
            speed_right = 25
        }
        if (GHBit.Rocker(GHBit.enRocker.Left)) {
            speed_fwd = 0
            speed_right = -25
        }
    }
    speed_right_motor = speed_fwd - speed_right
    speed_left_motor = speed_fwd + speed_right
    radio.sendValue("rgt_spd", speed_right_motor)
    serial.writeValue("rgt_spd", speed_right_motor)
    radio.sendValue("left_spd", speed_left_motor)
    serial.writeValue("left_spd", speed_left_motor)
})
