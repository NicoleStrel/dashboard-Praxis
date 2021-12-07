import digitalio
import board
import usb_cdc
import time

Red_Light = digitalio.DigitalInOut(board.GP3)
Red_Light.direction = digitalio.Direction.OUTPUT
Red_Light.value = False

Green_Light = digitalio.DigitalInOut(board.GP2)
Green_Light.direction = digitalio.Direction.OUTPUT
Green_Light.value = False

Infrared = digitalio.DigitalInOut(board.GP17)
Infrared.direction = digitalio.Direction.INPUT
Infrared.pull = digitalio.Pull.UP

Green_Light.value = Infrared.value
try:
    usb_cdc.data.write(bytes([Infrared.value]))
except:
    Red_Light.value = True

while True:
    if((Green_Light.value) != (Infrared.value)):
        Green_Light.value = Infrared.value
        try:
            usb_cdc.data.write(bytes([Infrared.value]))
        except:
            Red_Light.value = True
