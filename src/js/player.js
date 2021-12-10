import { tracks } from "./tracks";

const player = document.querySelector(".player");
const audio = document.createElement("audio");
player.append(audio);

let trackNum = 0;
let isPlaying = false;

if(!audio.paused) isPlaying = true;

// BUILD PLAYLIST

const playlist = document.querySelector(".playlist");

function buildPlaylist() {
    tracks.forEach(track => {
        const li = document.createElement("li");
        li.classList.add("track-name");

        li.innerText = track.title;
        playlist.append(li);
    })
}

buildPlaylist();



// CONTROLS

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
    } else {
        audio.pause();
    }

    playBtn.classList.toggle("pause_btn");
    changeListStyle();
}

// function playAudio() {
//     audio.src = tracks[trackNum].src;
//     audio.play();
//     playBtn.classList.toggle("pause_btn");

//     changeListStyle();
// }

function playNextAudio() {
    trackNum += 1;
    if(trackNum > tracks.length - 1) trackNum = 0;
    audio.src = tracks[trackNum].src;
    audio.play();

    changeListStyle();
}

function playPrevAudio() {
    trackNum -= 1;
    if(trackNum < 0) trackNum = tracks.length - 1;
    audio.src = tracks[trackNum].src;
    audio.play();

    changeListStyle();
}




// PLAY PLAYLIST

const trackNames = Array.from(document.querySelectorAll(".track-name"));
console.log(trackNames);

playlist.addEventListener("click", playAudioList);

function playAudioList(event) {
    let i = trackNames.indexOf(event.target);
    trackNum = i;

    if(!audio.paused) {
        audio.pause();
        playBtn.classList.remove("pause_btn");
    }
    audio.src = tracks[trackNum].src;
    audio.play();
    playBtn.classList.add("pause_btn");

    changeListStyle();
}

function changeListStyle() {
    trackNames.forEach(el => {
        el.classList.remove("selected-track");
    })

    trackNames[trackNum].classList.add("selected-track");
}


