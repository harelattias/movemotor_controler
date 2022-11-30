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
radio.setGroup(111)
basic.forever(function () {
	
})
loops.everyInterval(250, function () {
    radio.sendValue("acc_y", input.acceleration(Dimension.Y))
    serial.writeValue("acc_y", input.acceleration(Dimension.Y))
    radio.sendValue("acc_x", input.acceleration(Dimension.X))
    serial.writeValue("acc_x", input.acceleration(Dimension.X))
})
