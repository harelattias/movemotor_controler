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

speed_right = 0
speed_fwd = 0
radio.set_group(111)

def on_forever():
    pass
basic.forever(on_forever)

def on_every_interval():
    global speed_fwd, speed_right
    speed_fwd = Math.round(input.acceleration(Dimension.Y) / -10.23)
    radio.send_value("speed_forward", speed_fwd)
    serial.write_value("acc_y", speed_fwd)
    speed_right = Math.round(input.acceleration(Dimension.X) / 10.23)
    radio.send_value("speed_right", speed_right)
    serial.write_value("acc_x", speed_right)
loops.every_interval(250, on_every_interval)
