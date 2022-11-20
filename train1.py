import cv2

# to read image from file

fn = "passport.jpg" #input("Enter the image url: ")
img = cv2.imread(fn)
img = img * 2
print(img)
cv2.imshow("My Window", img)
cv2.waitKey()