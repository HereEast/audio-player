import './sass/index.scss';
console.log('Audio Player');

// BACKGROUND

const bg = document.querySelector(".main");

const query = "forest";
const link = `https://api.unsplash.com/photos/random?orientation=landscape&query=${query}&client_id=V8lOTIrneKtobM3z67kQMZKC5viIsIuKnjz5RHBYr54`;
const imageLinks = [];

let index = 0;
let imgIndex = 0;
let imgTotalNum = 10;

console.log(imageLinks);

const nextImageButton = document.querySelector(".bg-next");
const prevImageButton = document.querySelector(".bg-prev");

async function changeBackgroundImage() {
    try {
        const url = link;
        const res = await fetch(url);
        const data = await res.json();
        
        let imgURL = data.urls.regular;
        bg.style.backgroundImage = `url(${imgURL})`;
        imageLinks.push(imgURL);
        console.log(imageLinks.length);
    } 
    
    catch(e) {
        console.log("50 img/hour limit!");
        showNextFolderImage();
    }
}

changeBackgroundImage();

nextImageButton.addEventListener("click", changeBackgroundImage);
prevImageButton.addEventListener("click", showPrevImage);

function showPrevImage() {
    if(imageLinks.length === 0) {
        showPrevFolderImage();
    } else {
        showPrevUnsplashImage();
    }
}

function showPrevUnsplashImage() {
    imageLinks.reverse();
    let prevImageURL = imageLinks[index];
    bg.style.backgroundImage = `url(${prevImageURL})`;

    if(index >= imageLinks.length - 1) return;
    index++;
}

function showNextFolderImage() {
    if(imgIndex === imgTotalNum - 1) imgIndex = 0;
    let imgURL = `url('../images/bg/0${imgIndex}.png')`;
    bg.style.backgroundImage = imgURL;

    imgIndex++;
}

function showPrevFolderImage() {
    if(imgIndex === 0) imgIndex = imgTotalNum - 2;
    let imgURL = `url('../images/bg/0${imgIndex}.png')`;
    bg.style.backgroundImage = imgURL;

    imgIndex--;
}