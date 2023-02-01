def on_button_pressed_a():
    global is_joystik
    is_joystik = 0
    basic.show_leds("""
        . . . . .
                . . . . .
                . # # # .
                . # # # .
                . # # # .
    """)
    show_gear()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global is_joystik
    is_joystik = 1
    basic.show_leds("""
        . . . . .
                . . . . .
                . # # # .
                # # # # #
                # # . # #
    """)
    show_gear()
input.on_button_pressed(Button.B, on_button_pressed_b)

def show_gear():
    if gear == 1:
        led.plot(0, 0)
        led.unplot(1, 0)
        led.unplot(2, 0)
    else:
        if gear == 2:
            led.plot(0, 0)
            led.plot(1, 0)
            led.unplot(2, 0)
        else:
            if gear == 3:
                led.plot(0, 0)
                led.plot(1, 0)
                led.plot(2, 0)

def on_received_value(name, value):
    serial.write_value(name, value)
radio.on_received_value(on_received_value)

def on_logo_pressed():
    radio.send_string("beep")
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

speed_left_motor = 0
speed_right_motor = 0
speed_right = 0
speed_fwd = 0
gear = 0
is_joystik = 0
is_joystik = 0
basic.show_leds("""
    . . . . .
        . . . . .
        . # # # .
        . # # # .
        . # # # .
""")
radio.set_group(111)
gear = 2
show_gear()
speed_multiplier = 1
stop_by_dist = 1
led.plot(4, 0)

def on_forever():
    if GHBit.button(GHBit.enButton.B4, GHBit.enButtonState.REALSE):
        radio.send_string("off_off")
        serial.write_line("off_off")
    if GHBit.button(GHBit.enButton.B4, GHBit.enButtonState.PRESS):
        radio.send_string("off_lig")
    if GHBit.button(GHBit.enButton.B1, GHBit.enButtonState.REALSE):
        radio.send_string("on_sen")
    if GHBit.button(GHBit.enButton.B1, GHBit.enButtonState.PRESS):
        radio.send_string("off_sen")
    if GHBit.rocker(GHBit.enRocker.PRESS):
        radio.send_string("beep")
basic.forever(on_forever)

def on_every_interval():
    global speed_fwd, speed_right, speed_right_motor, speed_left_motor
    if is_joystik == 0:
        speed_fwd = Math.round(input.acceleration(Dimension.Y) / -15.1)
        if speed_fwd > -21.1 and speed_fwd < 21.1:
            speed_fwd = 0
        speed_right = Math.round(input.acceleration(Dimension.X) / 30.69)
        if speed_right > -7 and speed_right < 7:
            speed_right = 0
    elif is_joystik == 1:
        if GHBit.rocker(GHBit.enRocker.UP):
            speed_fwd = 66
            speed_right = 0
        if GHBit.rocker(GHBit.enRocker.NOSTATE):
            speed_fwd = 0
            speed_right = 0
        if GHBit.rocker(GHBit.enRocker.DOWN):
            speed_fwd = -66
            speed_right = 0
        if GHBit.rocker(GHBit.enRocker.RIGHT):
            speed_fwd = 0
            speed_right = 25
        if GHBit.rocker(GHBit.enRocker.LEFT):
            speed_fwd = 0
            speed_right = -25
    speed_right_motor = (speed_fwd - speed_right) * speed_multiplier
    speed_left_motor = (speed_fwd + speed_right) * speed_multiplier
    radio.send_value("rgt_spd", speed_right_motor)
    serial.write_value("rgt_spd", speed_right_motor)
    radio.send_value("left_spd", speed_left_motor)
    serial.write_value("left_spd", speed_left_motor)
loops.every_interval(250, on_every_interval)

def on_every_interval2():
    global stop_by_dist
    if GHBit.button(GHBit.enButton.B1, GHBit.enButtonState.PRESS):
        stop_by_dist += 1
        if stop_by_dist > 1:
            stop_by_dist = 0
    if stop_by_dist == 0:
        radio.send_string("off_dis")
        led.unplot(4, 0)
    if stop_by_dist == 1:
        radio.send_string("on_dis")
        led.plot(4, 0)
loops.every_interval(200, on_every_interval2)

def on_every_interval3():
    global gear, speed_multiplier
    if GHBit.button(GHBit.enButton.B2, GHBit.enButtonState.PRESS):
        gear += 1
        if gear > 3:
            gear = 3
        show_gear()
        serial.write_value("gear", gear)
    if GHBit.button(GHBit.enButton.B3, GHBit.enButtonState.PRESS):
        gear += -1
        if gear < 1:
            gear = 1
        show_gear()
        serial.write_value("gear", gear)
    if gear == 1:
        speed_multiplier = 0.75
    if gear == 2:
        speed_multiplier = 1
    if gear == 3:
        speed_multiplier = 1.5
loops.every_interval(200, on_every_interval3)
