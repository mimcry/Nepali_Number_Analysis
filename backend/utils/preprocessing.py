import numpy as np
import cv2

def horizontal_cutout(img):
  means = np.mean(img, axis=1)
  is_top = True
  top = 0
  bottom = 0
  end = len(means)-1
  for index, item in enumerate(means):
    if item != 255 and is_top:
      top = index
      is_top = False
    elif item == 255 and not is_top and index>top+40:
      bottom = index
      break
    elif item == 255 and index == end :
      bottom = end
  print(top, bottom)
  return img[top:bottom]

def vertical_cutout(img):
  img_t = np.transpose(img)
  img = horizontal_cutout(img_t)
  img = np.transpose(img)
  return img

def image_cutout(img):
  img = horizontal_cutout(img)
  img = vertical_cutout(img)
  return img

def preprocess_image(image):
  image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) #grayscale
  image = image_cutout(image) #cutout the number
  blurred = cv2.GaussianBlur(image, (23, 23), 0) #blur
  image = cv2.resize(blurred, (100, 100)) #resize to 100 for padding
  padding = 10 #padding
  padded_image = np.pad(
    image,
    pad_width=padding,
    mode='constant',
    constant_values=255  # White padding
  )
  resized = cv2.resize(padded_image, (32, 32)) #resize to 32x32
  inverted = 255.0 - resized #invert
  cv2.imwrite("test.png", inverted)
  
  return inverted