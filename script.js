let timers = [];
let timerId = 0;

document.getElementById('start-timer').addEventListener('click', startNewTimer);

function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours < 0 || minutes < 0 || seconds < 0) {
        alert('Please enter valid values for time!');
        return;
    }

    const totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (totalTimeInSeconds <= 0) {
        alert('Please enter a time greater than 0!');
        return;
    }

    const timer = {
        id: timerId++,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        totalTimeInSeconds: totalTimeInSeconds,
        interval: null
    };

    timers.push(timer);
    displayTimers();
    startTimer(timer);
}

function displayTimers() {
    const timerList = document.getElementById('timer-list');
    timerList.innerHTML = '';

    timers.forEach(timer => {
        const timerDiv = document.createElement('div');
        timerDiv.classList.add('timer-item');
        timerDiv.id = `timer-${timer.id}`;

        const timerDisplay = document.createElement('p');
        timerDisplay.textContent = formatTime(timer.hours, timer.minutes, timer.seconds);
        timerDiv.appendChild(timerDisplay);

        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop Timer';
        stopButton.classList.add('stop-btn');
        stopButton.addEventListener('click', () => stopTimer(timer.id));
        timerDiv.appendChild(stopButton);

        if (timer.totalTimeInSeconds <= 0) {
            timerDisplay.classList.add('timer-end');
        }

        timerList.appendChild(timerDiv);
    });
}

function startTimer(timer) {
    timer.interval = setInterval(() => {
        if (timer.totalTimeInSeconds <= 0) {
            clearInterval(timer.interval);
            playAudioAlert();
            document.getElementById(`timer-${timer.id}`).querySelector('p').classList.add('timer-end');
        } else {
            timer.totalTimeInSeconds--;
            timer.hours = Math.floor(timer.totalTimeInSeconds / 3600);
            timer.minutes = Math.floor((timer.totalTimeInSeconds % 3600) / 60);
            timer.seconds = timer.totalTimeInSeconds % 60;
            displayTimers();
        }
    }, 1000);
}

function stopTimer(timerId) {
    const timer = timers.find(t => t.id === timerId);
    clearInterval(timer.interval);
    timers = timers.filter(t => t.id !== timerId);
    displayTimers();
}

function formatTime(hours, minutes, seconds) {
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(value) {
    return value < 10 ? '0' + value : value;
}

function playAudioAlert() {
    const audio = new Audio('alert-sound.mp3');
    audio.play();
}
