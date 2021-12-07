import './sass/index.scss';

console.log('Museum');

// =========================
// SHOW AND HIDE POPUP
// =========================

const SHOW_POPUP_BUTTON = document.getElementById("buy__button");
const HIDE_POPUP_BUTTON = document.getElementById("popup-close__button");
const POPUP = document.querySelector(".buy-tickets__popup");

SHOW_POPUP_BUTTON.addEventListener("click", showPopup);
HIDE_POPUP_BUTTON.addEventListener("click", hidePopup);

function showPopup() {
    POPUP.classList.remove('popup__hidden');
}

function hidePopup() {
    POPUP.classList.add('popup__hidden');
}

// =========================
// CHECK NAME
// =========================

const NAME_INPUT = document.getElementById("input-name");
const ERROR_MESSAGE = document.querySelector(".error__message");

const checkNameInput = () => {
    const NAME_VALUE = NAME_INPUT.value;
  
    if(NAME_VALUE.length < 3 || NAME_VALUE.length > 15) {
       return false;
    }
    return true;
}

NAME_INPUT.addEventListener("blur", (event) => {
    const isValid = checkNameInput(); 
    if(!isValid) {
        ERROR_MESSAGE.innerHTML = "Check the name, please!";
    } else {
        ERROR_MESSAGE.innerHTML = "";
    }
});


// =========================
// DYNAMIC PHOTO GALLERY
// =========================

const pictureInnerContainer = document.querySelector('.pics-inner-container');

let imageArray = [
    `images/gallery/galery1.jpeg`, `images/gallery/galery2.jpeg`, `images/gallery/galery3.jpeg`,
    `images/gallery/galery4.jpeg`, `images/gallery/galery5.jpeg`, `images/gallery/galery6.jpeg`,
    `images/gallery/galery7.jpeg`, `images/gallery/galery8.jpeg`, `images/gallery/galery9.jpeg`,
    `images/gallery/galery10.jpeg`, `images/gallery/galery11.jpeg`, `images/gallery/galery12.jpeg`,
    `images/gallery/galery13.jpeg`, `images/gallery/galery14.jpeg`, `images/gallery/galery15.jpeg`
];

// Randomize array with images
let randomImages = imageArray.map(i => [Math.random(), i]).sort().map(i => i[1]);

// Create <img> element for every element in te array and put an image into src
randomImages.map(image => {
    const img = document.createElement('img');
    img.classList.add('gallery-pic');
    img.src = image;
    img.alt = `Louvre photo`;
    pictureInnerContainer.append(img);
});

///////////////////////

// SLIDE IMAGES IN PHOTO GALLERY

function debounce(func, wait = 20, immediate = true) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        let later = function() {
            timeout = null;
            if(!immediate) func.apply(context, args);
        };

        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
};

const slideImages = document.querySelectorAll('.gallery-pic');

function checkSlide(e) {
    // console.count(e);
    // console.log("Scroll, height: " + window.scrollY, window.innerHeight);
    // console.log("Bounding: " + slideImages[0].getBoundingClientRect().top);

    slideImages.forEach(img => {
        const imageCenterY = (window.scrollY + window.innerHeight) - img.height/2;
        const imageBottomY = img.offsetTop + img.height;
        
        const isHalfShown = imageCenterY > img.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottomY;

        if(isHalfShown && isNotScrolledPast) {
            img.classList.add('slide-up');
        } else {
            img.classList.remove('slide-up');
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide));



// =========================
// MAP
// =========================

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVyZWVhc3QiLCJhIjoiY2t2eTJ4bm14NG1ydDJ1dGtrYmhiZXRkNCJ9.2VqEwlTcTumQInJ6aDDKHw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [2.3376547269627475, 48.8607698936545],
    zoom: 15
});

map.addControl(new mapboxgl.NavigationControl());

const marker1 = new mapboxgl.Marker({ color: 'black' })
.setLngLat([2.33640, 48.86087])
.addTo(map);

const marker2 = new mapboxgl.Marker({ color: 'grey' })
.setLngLat([2.3333, 48.86017])
.addTo(map);

const marker3 = new mapboxgl.Marker({ color: 'grey' })
.setLngLat([2.3397, 48.8607])
.addTo(map);

const marker4 = new mapboxgl.Marker({ color: 'grey' })
.setLngLat([2.333, 48.8619])
.addTo(map);

const marker5 = new mapboxgl.Marker({ color: 'grey' })
.setLngLat([2.3365, 48.8625])
.addTo(map);



// =========================
// COMPARE SLIDER
// =========================

// const IMAGE_TOP = document.querySelector('.image-top');
// const SLIDER_INPUT = document.querySelector('.slider-input');
// const DRAG_LINE = document.querySelector('.drag-line');

// SLIDER_INPUT.addEventListener("input", moveDragLine);

// function moveDragLine () {
//     let rangeValue = this.value;
//     DRAG_LINE.style.left = rangeValue + "%";
//     IMAGE_TOP.style.width = rangeValue + "%";
// }

export function initComparisons() {
    let x = document.querySelector('.image-top');
    compareImages(x);
  
    function compareImages(img) {
      var img;
      let clicked = false;
      let w = img.offsetWidth;
      let h = img.offsetHeight;
      let slider = document.querySelector(".comp-slider");
      
      img.style.width = (w / 2) + "px";
  
      slider.addEventListener("mousedown", slideReady);
      window.addEventListener("mouseup", slideFinish);
  
      slider.addEventListener("touchstart", slideReady);
      window.addEventListener("touchstop", slideFinish);
      
      function slideReady(e) {
        e.preventDefault();
  
        clicked = true;
  
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
      }

      function slideFinish() {
        clicked = false;
        window.removeEventListener("mousemove", slideMove);
        window.removeEventListener("touchmove", slideMove);
      }
      
      function slideMove(e) {
        if (!clicked) return false;
        let pos = getCursorPos(e);
        /*prevent the slider from being positioned outside the image:*/
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        /*execute a function that will resize the overlay image according to the cursor:*/
        slide(pos);
      }

      function getCursorPos(e) {
        let x = 0;
        e = e || window.event;
        let a = img.getBoundingClientRect();
        /*calculate the cursor's x coordinate, relative to the image:*/
        x = e.pageX - a.left;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        return x;
      }

      function slide(x) {
        img.style.width = x + "px";
        slider.style.left = img.offsetWidth + "px";
      }
    }
  }
  
  initComparisons();


// =========================
// WELCOME SLIDER ARROWS
// =========================

const nextImgButton = document.querySelector('.arrow-next');
const prevImgButton = document.querySelector('.arrow-prev');
let currentImage = document.querySelector(".current-image");
let currentNumber = document.querySelector(".current-num");

const images = ["../images/welcome-0.jpg", "../images/welcome-1.jpg", 
                "../images/welcome-2.jpg", "../images/welcome-3.jpg",
                "../images/welcome-4.jpg"];


nextImgButton.addEventListener("click", showNextImage);
prevImgButton.addEventListener("click", showPrevImage);

function showNextImage () {
    let src = currentImage.getAttribute('src');
    let index = images.indexOf(src);

    if(index === images.length - 1) {
        currentImage.setAttribute('src', images[0]);
    } else {
        currentImage.setAttribute('src', images[index + 1]);
    }

    changeNumber();
    changeDotWithRightArrow();
}

function showPrevImage () {
    let src = currentImage.getAttribute('src');
    let index = images.indexOf(src);

    if(index === 0) {
        currentImage.setAttribute('src', images[length - 1]);
    } else {
        currentImage.setAttribute('src', images[index - 1]);
    }

    changeNumber();
    changeDotWithLeftArrow();
}

function changeNumber() {
    let src = currentImage.getAttribute('src');
    let index = images.indexOf(src);

    if(index === 0) currentNumber.innerHTML = "01";
    if(index === 1) currentNumber.innerHTML = "02";
    if(index === 2) currentNumber.innerHTML = "03";
    if(index === 3) currentNumber.innerHTML = "04";
    if(index === 4) currentNumber.innerHTML = "05";
}

// =========================
// WELCOME SLIDER NUMBERS
// =========================

const dots = document.querySelector('.slider_dots');
const allDots = document.querySelectorAll(".dot");

dots.addEventListener("click", switchDots);

function switchDots(e) {
    if(e.target.classList.contains('dot-active') || e.currentTarget === e.target) return;

    allDots.forEach(el => el.classList.remove('dot-active'));
    e.target.classList.add("dot-active");

    changeImageWithDot(e);
    changeNumber();
}

function changeImageWithDot(e) {
    let src = currentImage.getAttribute('src');

    if(e.target.classList.contains('slide-1')) currentImage.setAttribute('src', images[0]);
    if(e.target.classList.contains('slide-2')) currentImage.setAttribute('src', images[1]);
    if(e.target.classList.contains('slide-3')) currentImage.setAttribute('src', images[2]);
    if(e.target.classList.contains('slide-4')) currentImage.setAttribute('src', images[3]);
    if(e.target.classList.contains('slide-5')) currentImage.setAttribute('src', images[4]);
}

function changeDotWithRightArrow() {
    let activeDot = document.querySelector(".dot-active");

    if(activeDot.classList.contains("dot-active") && activeDot.classList.contains("slide-5")) {
        activeDot.classList.remove("dot-active");
        allDots[0].classList.add("dot-active");
     }

    if(activeDot.classList.contains("dot-active")) {
       activeDot.classList.remove("dot-active");
       activeDot.nextElementSibling.classList.add("dot-active");
    }
}

function changeDotWithLeftArrow() {
    let activeDot = document.querySelector(".dot-active");

    if(activeDot.classList.contains("dot-active") && activeDot.classList.contains("slide-1")) {
        activeDot.classList.remove("dot-active");
        allDots[4].classList.add("dot-active");
     }

    if(activeDot.classList.contains("dot-active")) {
       activeDot.classList.remove("dot-active");
       activeDot.previousElementSibling.classList.add("dot-active");
    }
}




