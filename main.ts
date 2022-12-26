input.onButtonPressed(Button.A, function () {
    radio.sendString("beep")
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("beeeeeeeep")
    basic.showIcon(IconNames.Sad)
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
let speed_left_motor = 0
let speed_right = 0
let speed_fwd = 0
radio.setGroup(111)
basic.forever(function () {
	
})
loops.everyInterval(250, function () {
    speed_fwd = Math.round(input.acceleration(Dimension.Y) / -15.1)
    if (speed_fwd > -21.1 && speed_fwd < 21.1) {
        speed_fwd = 0
    }
    speed_right = Math.round(input.acceleration(Dimension.X) / 30.69)
    if (speed_right > -7 && speed_right < 7) {
        speed_right = 0
    }
    speed_right = speed_fwd + speed_right
    speed_left_motor = speed_fwd - speed_right
    radio.sendValue("rgt_spd", speed_fwd)
    serial.writeValue("rgt_spd", speed_fwd)
    radio.sendValue("left_spd", speed_right)
    serial.writeValue("left_spd", speed_right)
})
