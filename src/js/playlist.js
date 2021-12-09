import { tracks } from "./tracks";

const playlist = document.querySelector(".playlist");

function buildPlaylist() {
    tracks.forEach(track => {
        const li = document.createElement("li");
        const trackName = document.createElement("a");
        trackName.classList.add("link");
        trackName.href="#";

        trackName.innerText = track.title;
        li.append(trackName);
        playlist.append(li);
    })
}

buildPlaylist();

console.log(playlist);