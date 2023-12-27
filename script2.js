const audioPlayer = document.getElementById('audio-player');
const playlistList = document.getElementById('playlist-list');
const searchInput = document.getElementById('search-input');

let playlist = [
    { title: 'Song 1', source: 'song1.mp3' },
    { title: 'Song 2', source: 'song2.mp3' },
    // Add more songs to the playlist
];

function loadPlaylist() {
    playlistList.innerHTML = '';
    playlist.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = song.title;
        listItem.addEventListener('click', () => playSong(index));
        playlistList.appendChild(listItem);
    });
}

function playSong(index) {
    const selectedSong = playlist[index];
    audioPlayer.src = selectedSong.source;
    audioPlayer.play();
}

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

function skip(direction) {
    let currentIndex = playlist.findIndex(song => song.source === audioPlayer.src);

    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % playlist.length;
    } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    }

    playSong(currentIndex);
}

function setVolume() {
    audioPlayer.volume = document.getElementById('volume-slider').value;
}

function search() {
    const searchTerm = searchInput.value.toLowerCase();
    const searchResults = playlist.filter(song => song.title.toLowerCase().includes(searchTerm));
    if (searchResults.length > 0) {
        playlist = searchResults;
        loadPlaylist();
        playSong(0); // Play the first result
    } else {
        alert('No results found.');
    }
}

// Initialize the playlist and load it
loadPlaylist();
playSong(0); // Play the first song by default
