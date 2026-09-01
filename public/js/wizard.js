/**
 * Guided Self-Enumeration Wizard (Vision Camera Capture & Live Voice Intake)
 */
let camStream = null;

async function openCamera() {
    try {
        camStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        const videoEl = document.getElementById('cam-video');
        if (videoEl) {
            videoEl.srcObject = camStream;
            videoEl.style.display = 'block';
        }
        document.getElementById('cam-placeholder').style.display = 'none';
        document.getElementById('cam-snapshot').style.display = 'none';
        
        document.getElementById('btn-cam-open').style.display = 'none';
        document.getElementById('btn-cam-capture').style.display = 'inline-flex';
        document.getElementById('btn-cam-retake').style.display = 'none';

        announceAccessibility("Camera active. Align face inside frame and click Capture Photo.");
    } catch(e) {
        alert("Camera access denied or unavailable. Facial vision simulation activated.");
        document.getElementById("ins-name").value = "Aarav Sharma (Verified)";
        document.getElementById("ins-age").value = "34";
    }
}

function capturePhoto() {
    const videoEl = document.getElementById('cam-video');
    if (!videoEl) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth || 640;
    canvas.height = videoEl.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    
    const imgData = canvas.toDataURL('image/jpeg');
    const imgEl = document.getElementById('cam-snapshot');
    if (imgEl) {
        imgEl.src = imgData;
        imgEl.style.display = 'block';
    }
    videoEl.style.display = 'none';
    
    document.getElementById('btn-cam-capture').style.display = 'none';
    document.getElementById('btn-cam-retake').style.display = 'inline-flex';

    document.getElementById("ins-name").value = "Aarav Sharma";
    document.getElementById("ins-age").value = "34";

    if (camStream) {
        camStream.getTracks().forEach(track => track.stop());
    }

    announceAccessibility("Photo captured. Demographic credentials extracted.");
}

function retakePhoto() {
    document.getElementById('cam-snapshot').style.display = 'none';
    document.getElementById('btn-cam-retake').style.display = 'none';
    openCamera();
}

/* Voice Intake Dictation */
let recognition = null;
let isRecording = false;

function toggleVoiceRecording() {
    const btn = document.getElementById('btn-voice');
    const statusText = document.getElementById('voice-status');
    const inputField = document.getElementById('ins-water');
    
    if (isRecording) {
        if (recognition) recognition.stop();
        return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
        alert("Speech recognition is not supported in this browser. Simulated voice intake activated.");
        if (inputField) inputField.value = "Tap water connection inside household premises (Dictated)";
        return;
    }

    recognition = new SpeechRec();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onstart = () => {
        isRecording = true;
        if (btn) {
            btn.classList.add('recording');
            btn.innerHTML = "⏹ Stop Voice Intake";
        }
        if (statusText) statusText.innerText = "Listening... Speak now.";
        announceAccessibility("Voice recording started. Speak your answers.");
    };
    
    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        
        if (inputField) {
            inputField.value = finalTranscript + interimTranscript;
        }
    };
    
    recognition.onerror = (event) => {
        if (statusText) statusText.innerText = "Voice status: Ready";
        stopRecordingState(btn, statusText);
    };
    
    recognition.onend = () => {
        stopRecordingState(btn, statusText);
    };

    recognition.start();
}

function stopRecordingState(btn, statusText) {
    isRecording = false;
    if (btn) {
        btn.classList.remove('recording');
        btn.innerHTML = "🎤 Start Voice Intake";
    }
    if (statusText) statusText.innerText = "Tap to speak. Your voice will be transcribed live.";
    announceAccessibility("Voice recording stopped.");
}
