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
    
    root = db.reference('characters').child('-LtNOha8Bnuc37xznofH').get()
    print(root)

    
except:
    print('Error with DB! Stopping the application...')
    sys.exit(1)
#

# get random arcade matrix
'''def get_random_arcade_matrix():
    pattern = ''
    matrix = []
    for r in range(0,8):
        temp_str = ''
        for c in range(0, 4):
            temp_str = temp_str + str(round(random.random()))

        # spiegeling
        temp_str = temp_str + temp_str[::-1]
        pattern = pattern + temp_str                   
                    
    for p in range(0,64):
        bit = int(pattern[p])
        color = COLOR_BLUE if bit == 1 else COLOR_BLACK
        matrix.append(color)

    return(matrix)
    '''

def main():
    while True:
        '''matrix = get_random_arcade_matrix()

        sense_hat.set_pixels(matrix)'''
        sleep(3)

if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        print('Interrupt received! Stopping the application...')
    finally:
        print('Cleaning up the mess...')
        sys.exit(0)
        
