# Instagram Batch Manager
## An app that sends photos from a Dropbox folder to Instagram

Instagram Batch Manager is a personal tool I created to make it easier to manage batches of images that I want to slowly release through Instagram. Basically it lets me store images in Dropbox and pre-write the captions, then I can post them to Instagram as I feel like it. It is kind of rough, but it does the trick for me. 

My needs were simple:
- I want to store my photos in a folder in Dropbox.
- I want to pre-write the captions so when I send the photo to Instagram I don’t have to manually write anything.
- I don’t want to open my photo library, find the photo, and write a caption every time.

My solution is an iOS app that pulls photos and captions from DropBox and lets me push them to Instagram with one tap. If that is something you desire, perhaps this project will help you. Be warned that you have to customize it for your needs and I don’t offer support.

**Requirements**:
- A server that runs PHP that you can FTP files to
- A Dropbox account
- An Instagram account
- An iOS developer account (so you can put the app on your device)
- Knowledge: Phonegap/Cordova, Xcode, basic PHP, Javascript, HTML

**Libraries/Plugins**
- The cordova Instagram Plugin (cordova plugins add https://github.com/vstirbu/InstagramPlugin)
- Foundation (http://foundation.zurb.com)

**Phonegap/Cordova Notes**
Building a Phonegap/Cordova app is a bit tricky, so you should probably have experience with Phonegap before attempting to customize this project. In very general terms, however, the steps are: 1. Navigate to your folder from the terminal, 2. Add iOS platform, 3. Phonegap/Cordova build, 4. Run on your device from Xcode. If any of that is beyond your abilities, this project probably isn’t for you unless you are willing to find some Phonegap tutorials online and dig in.  

**Dropbox Notes**
The folder you use to store the photos you want to send to Instagram must be public. That doesn’t mean people will be able to see it, necessarily. Dropbox gives you a public URL that is essentially a key to accessing your public folder. Without the “key” your public files would be nearly impossible to find. 

**How to Use**:
In order to get Instagram Batch Manager working you need to modify several files in this project. Here is a description of the files and what you need to do with them:

**captions.js**
This file is where all your captions for your photos will live. Put it in Dropbox in the same folder as all your images. Formatting is critical as this must be exact, otherwise it won’t work. The formatting is as follows:

[{
"image1.jpg": "Caption 1",
"image2.png": "Caption 2",
"image3.jpg": "Caption 3"
}]

Note that both jpg and png files are fine. If the name of the image doesn’t correspond with the image name of a file in the Dropbox folder it won’t be read. If an image doesn’t have a caption, that’s okay, you can still send the image to Instagram. 

**instaBatchPhotos.php**
This file looks at your public Dropbox folder and creates a JSON list of all the jpg and png files contained in that folder. The app reads this list and lets you send them to Instagram. 

Edit the beginning of the file to update the address of your public Dropbox folder. This address can be found when you share the dropbox folder. 

Note the address of where you upload this file because you will have to put this file’s url in app.js.

**instaBatchCaptions.php**
This file grabs the caption.js file and creates a list of all the captions that the app will use to match captions with images.

Edit the beginning of the file to update the address of your public Dropbox folder. This address can be found when you share the dropbox folder.

Note the address of where you upload this file because you will have to put this file’s url in app.js.

**app.js**
This file lives in the www/js folder. You need to update the lines at the beginning of this file to correspond with the paths to where your Instagram Batch Manager.php and Instagram Batch ManagerTweets.php file reside.

**index.html**
The index file has nav buttons that open the Dropbox folder of images you specified in the PHP files. Be sure the variables match the names you pre-defined.

**Limitations**:
This project is available as-is. I don’t offer support, so be sure you understand the following limitations:

- Instagram Batch Manager remembers what photos you have uploaded, but this is relative to the device. If you use multiple devices it won’t know the files that the other devices uploaded. I might consider adding syncing in the future, but right now it isn’t a priority.

- It would be nice to be able to schedule photos to get posted automatically. This app does not do that. You still have to manually post each image through Instagram. This is mandated by Instagram and unless they change their API and policies this will always be true. 

- Instagram Batch Manager grabs the full size file from Dropbox when it loads or refreshes. If you put huge images in Dropbox it will take a long time for Instagram Batch Manager to bring the images into the app. 

- Theoretically the PHP part of this app could be done in-app making it unnecessary to need a server to use this app. Feel free to build this functionality, but it isn’t something I will pursue at this time. 

Thanks for looking at this project. If you are curious about my work, visit [adrian3.com](http://adrian3.com).