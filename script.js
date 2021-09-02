const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


//Unsplash API
let count = 5;
const apiKey = '3Q7AD4yPGoeY_eg5XHlleCl60ndqG9vIw23-AEO-YHs';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper Function to Set Atrributes
function setAtrributes(element, attributes) {
    for(const key in attributes) {
        element.setAtrribute(key, attributes[key])
    }
}


//Create Elements For Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log(imagesLoaded);
    photosArray.forEach((photo) => {
        //Create <a>
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // setAtrributes(item, {
        //     href: photo.links.html,
        //     target: '_blank',
        // });
        //Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAtrribute('alt', photo.alt_description);
        img.setAtrribute('title', photo.alt_description);
        // setAtrributes(img, {
        //     src: photo.urls.regular,
        //     alt: photo.alt_description,
        //     title: photo.alt_description,
        // });
        //Put <img> inside <a>, then put both inside imageContainer
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch(error) {
        //Catching Error Here.
    }
}


//Check if scrolling is near the end, then load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();
