from sense_hat import SenseHat
from time import time, sleep
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import firestore
import os
import sys
import random
import json
from math import floor, ceil

# constants
COLOR_BLUE = (0, 0, 255)
COLOR_BLACK = (0, 0, 0)

try:
    # SenseHat
    sense_hat = SenseHat()
    sense_hat.set_imu_config(False, False, False)

except:
    print('Unable to initialize the Sense Hat library: {}'.format(sys.exc_info()[0]))
    sys.exit(1)

try:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred, {
        'databaseURL' : 'https://character-generator-695b1.firebaseio.com/'
    })
    
    ref = db.reference('characters').child('selected')

    
except:
    print('Error with DB! Stopping the application...')
    sys.exit(1)

def main():
    while True:
        #retrieve data
        root = ref.get()
        
        
        # remove the u prefix from the list
        data = map(str, root)

        
        # replace all the rgb with nothing
        data[:] = [s.replace("rgb", '') for s in data]

        # change the strings inside the list into color tuples
        res = list(map(eval, data))       

        sense_hat.set_pixels(res)
        
        sleep(1)
        print('Current colors tuple:', res)  

if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        print('Interrupt received! Stopping the application...')
    finally:
        print('Cleaning up the mess...')
        sys.exit(0)
