input.onButtonPressed(Button.A, function () {
    is_joystik = 0
    basic.showLeds(`
        . . . . .
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        `)
    show_gear()
})
input.onButtonPressed(Button.B, function () {
    is_joystik = 1
    basic.showLeds(`
        . . . . .
        . . . . .
        . # # # .
        # # # # #
        # # . # #
        `)
    show_gear()
})
function show_gear () {
    if (gear == 1) {
        led.plot(0, 0)
        led.unplot(1, 0)
        led.unplot(2, 0)
    } else {
        if (gear == 2) {
            led.plot(0, 0)
            led.plot(1, 0)
            led.unplot(2, 0)
        } else {
            if (gear == 3) {
                led.plot(0, 0)
                led.plot(1, 0)
                led.plot(2, 0)
            }
        }
    }
}
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
let gear = 0
let is_joystik = 0
is_joystik = 0
basic.showLeds(`
    . . . . .
    . . . . .
    . # # # .
    . # # # .
    . # # # .
    `)
radio.setGroup(111)
gear = 2
show_gear()
let speed_multiplier = 1
let stop_by_dist = 1
led.plot(4, 0)
basic.forever(function () {
    if (GHBit.Button(GHBit.enButton.B4, GHBit.enButtonState.Realse)) {
        radio.sendString("off_off")
        serial.writeLine("off_off")
    }
    if (GHBit.Button(GHBit.enButton.B4, GHBit.enButtonState.Press)) {
        radio.sendString("off_lig")
    }
    if (GHBit.Button(GHBit.enButton.B1, GHBit.enButtonState.Realse)) {
        radio.sendString("on_sen")
    }
    if (GHBit.Button(GHBit.enButton.B1, GHBit.enButtonState.Press)) {
        radio.sendString("off_sen")
    }
    if (GHBit.Rocker(GHBit.enRocker.Press)) {
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
    speed_right_motor = (speed_fwd - speed_right) * speed_multiplier
    speed_left_motor = (speed_fwd + speed_right) * speed_multiplier
    radio.sendValue("rgt_spd", speed_right_motor)
    serial.writeValue("rgt_spd", speed_right_motor)
    radio.sendValue("left_spd", speed_left_motor)
    serial.writeValue("left_spd", speed_left_motor)
})
loops.everyInterval(200, function () {
    if (GHBit.Button(GHBit.enButton.B1, GHBit.enButtonState.Press)) {
        stop_by_dist += 1
        if (stop_by_dist > 1) {
            stop_by_dist = 0
        }
    }
    if (stop_by_dist == 0) {
        radio.sendString("off_dis")
        led.unplot(4, 0)
    }
    if (stop_by_dist == 1) {
        radio.sendString("on_dis")
        led.plot(4, 0)
    }
})
loops.everyInterval(200, function () {
    if (GHBit.Button(GHBit.enButton.B2, GHBit.enButtonState.Press)) {
        gear += 1
        if (gear > 3) {
            gear = 3
        }
        show_gear()
        serial.writeValue("gear", gear)
    }
    if (GHBit.Button(GHBit.enButton.B3, GHBit.enButtonState.Press)) {
        gear += -1
        if (gear < 1) {
            gear = 1
        }
        show_gear()
        serial.writeValue("gear", gear)
    }
    if (gear == 1) {
        speed_multiplier = 0.75
    }
    if (gear == 2) {
        speed_multiplier = 1
    }
    if (gear == 3) {
        speed_multiplier = 1.5
    }
})
