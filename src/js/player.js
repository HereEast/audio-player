import { tracks } from "./tracks";

const player = document.querySelector(".player");
const audio = document.createElement("audio");
player.append(audio);

let trackNum = 0;
let currentAudioTime = 0;
let value = 0;

if(!audio.paused) isPlaying = true;

// BUILD PLAYLIST

const playlist = document.querySelector(".playlist");

function buildPlaylist() {
    tracks.forEach(track => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.classList.add("track-name");

        a.innerText = track.title;
        li.append(a);
        playlist.append(li);
    })
}

buildPlaylist();


//////////////
// CONTROLS //
//////////////

const playBtn = document.querySelector(".play_btn");
const nextTrackBtn = document.querySelector(".next-track_btn");
const prevTrackBtn = document.querySelector(".prev-track_btn");

playBtn.addEventListener("click", toggleAudio);
nextTrackBtn.addEventListener("click", playNextAudio);
prevTrackBtn.addEventListener("click", playPrevAudio);

function toggleAudio() {
    if(audio.paused) {
        audio.src = tracks[trackNum].src;
        audio.play();
        playBtn.classList.add("pause_btn");
    } else {
        audio.pause();
        playBtn.classList.remove("pause_btn");
    }

    changeListStyle();
}

function playNextAudio() {
    if(audio.paused) return;

    trackNum += 1;
    if(trackNum > tracks.length - 1) trackNum = 0;
    audio.src = tracks[trackNum].src;
    audio.play();

    changeListStyle();
}

function playPrevAudio() {
    if(audio.paused) return;

    trackNum -= 1;
    if(trackNum < 0) trackNum = tracks.length - 1;
    audio.src = tracks[trackNum].src;
    audio.play();

    changeListStyle();
}


//////////////////
// PROGRESS BAR //
//////////////////

const progressBar = document.querySelector(".progress-bar");

progressBar.addEventListener("input", changeProgress);
console.log(progressBar.value);

function changeProgress() {
    value = progressBar.value;
    let progress = `linear-gradient(to right, #000000 0%, #000000 ${value}%, #D4D4D4 ${value}%, #D4D4D4 100%)`;
    progressBar.style.background = progress;
}



///////////////////
// PLAY PLAYLIST //
///////////////////

const trackNames = Array.from(document.querySelectorAll(".track-name"));
console.log(trackNames);

playlist.addEventListener("click", playAudioList);

function playAudioList(event) {
    let i = trackNames.indexOf(event.target);
    trackNum = i;

    toggleAudio();
    changeListStyle();
}

function changeListStyle() {
    trackNames.forEach(el => {
        el.classList.remove("selected-track");
    })

    trackNames[trackNum].classList.add("selected-track");
}


