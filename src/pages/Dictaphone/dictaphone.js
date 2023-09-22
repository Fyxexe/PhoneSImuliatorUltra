
let audioStream;
let mediaRecorder;
let audioChunks = [];


const startButton = document.getElementById('startRecord');
const stopButton = document.getElementById('stopRecord');
const downloadLink = document.getElementById('downloadLink');
const audioPlayer = document.getElementById('audioPlayer');


startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);


function startRecording() {
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            audioStream = stream;
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                audioPlayer.src = audioUrl;
                downloadLink.href = audioUrl;
                downloadLink.style.display = 'block';
                audioPlayer.style.display = 'block';
                downloadLink.download = 'recording.wav';
            };

            mediaRecorder.start();
            startButton.disabled = true;
            stopButton.disabled = false;
        })
        .catch((error) => {
            console.error('Error accessing microphone:', error);
        });
}


function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        audioStream.getTracks().forEach((track) => track.stop());
        startButton.disabled = false;
        stopButton.disabled = true;
    }
}


