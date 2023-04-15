/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById('camera').addEventListener("click", openCamera);
document.getElementById('currentLocation').addEventListener("click", sendLocation)


//function to open camera and take photo

function openCamera() {
    console.log("camera opened!")
    navigator.camera.getPicture(onImageSuccess, onFail, options);

    var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true,
        targetWidth: 200,
        targetHeight: 250
    }

    function onImageSuccess(FILE_URI) {
        var image = document.getElementById('yourPhoto');
        var paraImage = document.getElementById('msg');

        image.src = "data:image/jpeg;base64," + FILE_URI;
        paraImage.innerHTML = "Image saved to: " + FILE_URI;
    };

    function onFail(message) {
        alert('Failed because: ' + message);
    }
};


//function to get the geolocation 

function sendLocation() {
    console.log("location retrieved!")

    var locationOptions = {
        enableHighAccuracy: true,
        timeOut: 50000,
        maximumAge: 30000

    }

    function onLocationSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
    }
    // onError Callback receives a PositionError object

    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    var watchID = navigator.geolocation.watchPosition(onLocationSuccess, onError, locationOptions);
 
    navigator.geolocation.clearWatch(watchID);

    navigator.geolocation.getCurrentPosition(onLocationSuccess, onError,);
};


function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
};
