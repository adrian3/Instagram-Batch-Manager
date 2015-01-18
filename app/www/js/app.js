// replace the url's below to correspond with where you hosted your php files
var captionListURL = "http://www.yourserver.com/instaBatchCaptions.php";
var photoListURL = "http://www.yourserver.com/instaBatchPhotos.php";

$(document).ready(function() {
    // if you want to have the folder load when app launches:
    getDropboxInfo('folder-name-1');
});

$(document).foundation();

function insertImageInCanvas(id) {
    var c = document.getElementById("insta");
    var ctx = c.getContext("2d");
    var img = document.getElementById(id);

    var width = $("#"+id).get(0).naturalWidth; 
    var height = $("#"+id).get(0).naturalHeight;
    c.height = height;
    c.width = width;

    ctx.drawImage(img, 0, 0);
}

Instagram.isInstalled(function(err, installed) {
    if (installed) {
        console.log("Instagram is", installed); // installed app version on Android
    } else {
        console.log("Instagram is not installed");
    }
});

function sendToInstagram(id, captionId) {
    insertImageInCanvas(id);
    $('#'+id).addClass('uploaded');
      $('img#'+id).after('<h1>&#10004;</h1>');      

    caption = localStorage.getItem(captionId);
    // alert(caption);
    Instagram.share("insta", caption, function(err) {
        if (err) {
            console.log("not shared");
            localStorage.setItem("shareStatus-"+captionId, "shareFail");
        } else {
            localStorage.setItem("shareStatus-"+captionId, "shareSuccess");
            console.log("shared");
        }
    });
}

var captionData = "";

function getDropboxInfo(folder) {
    captionData = "";
    var photoData = "";
    $.get(captionListURL+'?folder='+folder, function(captionData) {
        captionData = jQuery.parseJSON(captionData);
        for (var key in captionData[0]) {
            localStorage.setItem(key, captionData[0][key]);
        }
    });

    $.get(photoListURL+'?folder='+folder, function(photoData) {
        photoData = jQuery.parseJSON(photoData);
        $('#list').html("");

        var count = 1;
        var rowStart = "";
        var rowEnd = "";

        for (var i = 0; i < photoData.length; i++) {
            if(count>3) {
             count = 1;   
            }
            if(count===1) {
             row = '';   
            }
            else if(count===2) {
             row = '';  
            }
            else if(count===3) {
             row = '<div class="space"></div>';   
            }
            if(i+1 === photoData.length) {
             row = '<div class="row"></div>';   
            }
            var fileName = photoData[i].file;
            photosrc = 'https://www.dropbox.com' + photoData[i].path + '?raw=1';

            $('#list').append('<div class="small-12 medium-4 large-4 columns share'+i+'"><a href="#" onclick="sendToInstagram(\'imageID' + i + '\',\'' + photoData[i].file + '\');"><img class="previewImage" id="imageID'+i+'" src="'+photosrc+'"><div class="caption large-12 columns">' + lookupCaption(photoData[i].file) + '</div></a></div>'+row);

            checkUploadStatus(photoData[i].file,i);
            count++;
        }
    });
}

function lookupCaption(captionID) {
    theCaption = localStorage.getItem(captionID);
    if(theCaption!=undefined&&theCaption!="") {
      return(theCaption);
    }
    else {
        cleanFileName=convertFileNameToCaption(captionID);
        return(cleanFileName);
    }
}

function convertFileNameToCaption(fileName) {
    convertedCaption = fileName.split(".");
    convertedCaption = convertedCaption[0];
    convertedCaption = convertedCaption.replace("_", " ");
    convertedCaption = convertedCaption.replace("_", " ");
    convertedCaption = convertedCaption.replace("_", " ");
    convertedCaption = convertedCaption.replace("-", " ");
    convertedCaption = convertedCaption.replace("-", " ");
    convertedCaption = convertedCaption.replace("-", " ");
    convertedCaption = convertedCaption.replace(/[0-9]/g, ''); // strip out all numbers

    return(convertedCaption);
}

function checkUploadStatus(fileName,listID) {
    status = localStorage.getItem("shareStatus-"+fileName);
    if(status==="shareSuccess") {
      $('.share'+listID).addClass('uploaded');
      $('.share'+listID+' img').after('<h1>&#10004;</h1>');      
    }
    if(status==="shareFail") {
      $('.share'+listID).addClass('failed');
      $('.share'+listID+' img').after('<h1>&#10005;</h1>');      
    }
    else {
      $('.share'+listID).addClass('unshared');
      $('.share'+listID+' img').after('<h1></h1>');      
    }
}

function hideShared() {
    $('.uploaded').hide();
}

function showShared() {
    $('.uploaded').show();
}




