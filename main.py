def on_button_pressed_a():
    radio.send_string("beep")
    basic.show_icon(IconNames.HAPPY)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    radio.send_string("beeeeeeeep")
    basic.show_icon(IconNames.SAD)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    serial.write_value(name, value)
radio.on_received_value(on_received_value)

radio.set_group(111)

def on_forever():
    pass
basic.forever(on_forever)

def on_every_interval():
    radio.send_value("acc_y", input.acceleration(Dimension.Y))
    serial.write_value("acc_y", input.acceleration(Dimension.Y))
    radio.send_value("acc_x", input.acceleration(Dimension.X))
    serial.write_value("acc_x", input.acceleration(Dimension.X))
loops.every_interval(250, on_every_interval)
