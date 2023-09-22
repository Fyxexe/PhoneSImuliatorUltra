document.addEventListener('DOMContentLoaded', function() {

    const audioPlayers = document.querySelectorAll('.audio-player');
    

    audioPlayers.forEach(function(audioPlayer, index) {
        const playPauseButtons = document.querySelectorAll('.play-pause');
        const seekBars = document.querySelectorAll('.seek-bar');
        const currentTimeElements = document.querySelectorAll('.current-time');
        const durationElements = document.querySelectorAll('.duration');


        playPauseButtons[index].addEventListener('click', function() {
            if (audioPlayer.paused || audioPlayer.ended) {
                audioPlayer.play();
                playPauseButtons[index].textContent = 'Pause';
            } else {
                audioPlayer.pause();
                playPauseButtons[index].textContent = 'Play';
            }
        });

        audioPlayer.addEventListener('timeupdate', function() {
            const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
            const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
            currentTimeElements[index].textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
            seekBars[index].value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        });

        seekBars[index].addEventListener('input', function() {
            const newPosition = audioPlayer.duration * (seekBars[index].value / 100);
            audioPlayer.currentTime = newPosition;
            const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
            const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
            currentTimeElements[index].textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        });

        audioPlayer.addEventListener('loadedmetadata', function() {
            const durationMinutes = Math.floor(audioPlayer.duration / 60);
            const durationSeconds = Math.floor(audioPlayer.duration % 60);
            durationElements[index].textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
        });
    });
});
