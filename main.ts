input.onButtonPressed(Button.A, function () {
    radio.sendValue("drive", 1)
    basic.showNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("drive", -1)
    basic.showNumber(-1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendValue("drive", 0)
    basic.showNumber(0)
})
radio.setGroup(111)
basic.forever(function () {
	
})
loops.everyInterval(100, function () {
    radio.sendValue("acc_y", input.acceleration(Dimension.Y))
    serial.writeValue("acc_y", input.acceleration(Dimension.Y))
})
