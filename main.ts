radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
radio.setGroup(111)
basic.forever(function () {
	
})
loops.everyInterval(250, function () {
    radio.sendValue("acc_y", input.acceleration(Dimension.Y))
    serial.writeValue("acc_y", input.acceleration(Dimension.Y))
})
