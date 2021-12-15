import { tracks } from "./tracks";

const player = document.querySelector(".player");
const audio = document.createElement("audio");
player.append(audio);


const playlist = document.querySelector(".playlist");

tracks.forEach(el => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.innerHTML = el.title;
    a.classList.add("track-name");
    li.append(a);
    playlist.append(li);
})

///////////////

let trackNum = 0;
let prevTrackNum;
let currentTime = 0;

const trackNames = Array.from(document.querySelectorAll(".track-name"));

// PLAY

const playBtn = document.querySelector(".play_btn");
const prevBtn = document.querySelector(".prev-track_btn");
const nextBtn = document.querySelector(".next-track_btn");

playBtn.addEventListener("click", toggleAudio);
prevBtn.addEventListener("click", playPrevAudio);
nextBtn.addEventListener("click", playNextAudio);

function toggleAudio() {
    if(audio.paused) {
        play();
    } else {
        pause();
    }
}

function playNextAudio() {
    if(audio.paused) return;

    trackNum += 1;
    if(trackNum >= tracks.length) trackNum = 0;

    currentTime = 0;
    play();
}

function playPrevAudio() {
    if(audio.paused) return;
    trackNum -= 1;
    if(trackNum < 0) trackNum = tracks.length - 1;

    currentTime = 0;
    play();
}

// PLAY PLAYLIST

playlist.addEventListener("click", playListTrack);

function playListTrack(event) {
    prevTrackNum = trackNum;
    let n = trackNames.indexOf(event.target);
    trackNum = n;
    
    if(!audio.paused && trackNames[n].classList.contains("selected-track") && prevTrackNum === trackNum) {
        pause();
    } else {
        play();
    }

    if(!audio.paused && prevTrackNum !== trackNum) {
        currentTime = 0;
        play();
    }
}

// PLAY BUTTON STYLE

function changePlayIcon() {
    if(audio.paused) {
        playBtn.classList.add("play_btn");
        playBtn.classList.remove("pause_btn");
    } else {
        playBtn.classList.add("pause_btn");
        playBtn.classList.remove("play_btn");
    }
}

// PLAYING TRACK STYLE

function changePlayingTrackStyle() {
    trackNames.forEach(el => {
        el.classList.remove("selected-track");
    })

    trackNames[trackNum].classList.add("selected-track");
}


/////////////////////////////////////
// PLAY /////////////////////////////

function play() {
    audio.src = tracks[trackNum].src;
    audio.currentTime = currentTime;
    audio.play();

    changePlayIcon();
    changePlayingTrackStyle();
}

// PAUSE ////////////////////////////

function pause() {
    currentTime = audio.currentTime;
    audio.pause();

    changePlayIcon();
    changePlayingTrackStyle()
}

/////////////////////////////////////
/////////////////////////////////////


// PROGRESS

const progressBar = document.querySelector(".progress-bar");
const timer = document.querySelector(".timer");

progressBar.addEventListener("input", dragProgress);
audio.addEventListener("timeupdate", changeAudioProgress);

function dragProgress() {
    audio.currentTime = audio.duration * progressBar.value / 100;
    currentTime = audio.currentTime;

    changeAudioProgress();
}

function changeAudioProgress() {
    currentTime = audio.currentTime;
    let value = currentTime / audio.duration * 100;

    let progress = `linear-gradient(to right, #000000 0%, #000000 ${value}%, #D4D4D4 ${value}%, #D4D4D4 100%)`;
    progressBar.style.background = progress;

    changeTimer();
}

function changeTimer() {
    let mins = Math.floor(audio.currentTime / 60);
    let secs = Math.floor(audio.currentTime - mins * 60);

    if(mins < 10) mins = "0" + mins;
    if(secs < 10) secs = "0" + secs;

    timer.innerHTML = `${mins}:${secs}`;
}

