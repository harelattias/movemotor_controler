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
let speed_right = 0
let speed_fwd = 0
radio.setGroup(111)
basic.forever(function () {
	
})
loops.everyInterval(250, function () {
    speed_fwd = Math.round(input.acceleration(Dimension.Y) / -10.23)
    radio.sendValue("cmd_fwd", speed_fwd)
    serial.writeValue("forward", speed_fwd)
    speed_right = Math.round(input.acceleration(Dimension.X) / 10.23)
    radio.sendValue("cmd_rgt", speed_right)
    serial.writeValue("right", speed_right)
})
