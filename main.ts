input.onButtonPressed(Button.A, function on_button_pressed_a() {
    radio.sendString("beep")
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    radio.sendString("beeeeeeeep")
    basic.showIcon(IconNames.Sad)
})
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    serial.writeValue(name, value)
})
let speed_right = 0
let speed_fwd = 0
radio.setGroup(111)
basic.forever(function on_forever() {
    
})
loops.everyInterval(250, function on_every_interval() {
    
    speed_fwd = Math.round(input.acceleration(Dimension.Y) / -10.23)
    radio.sendValue("speed_forward", speed_fwd)
    serial.writeValue("acc_y", speed_fwd)
    speed_right = Math.round(input.acceleration(Dimension.X) / 10.23)
    radio.sendValue("speed_right", speed_right)
    serial.writeValue("acc_x", speed_right)
})
