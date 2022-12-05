let el = {
    hours: document.querySelector('.hours'),
    minutes: document.querySelector('.minutes'),
    seconds: document.querySelector('.seconds'),
    control: document.querySelector('.start-stop-btn'),
    set: document.querySelector('.set-timer-btn'),
    timers: document.querySelector('.preset-wrap'),
    addTimer: document.querySelector('#addPreset')
}

let timerPresets = [
    {
        name: 'Brush Teeth',
        time: 120,
    },
    {
        name: 'Plank',
        time: 180,
    },
    {
        name: 'Steam eggs',
        time: 600,
    },
    {
        name: 'Face Mask',
        time: 900,
    },
]

let updateTimerPresets = () => {    
    timerPresets.forEach(elm => {
        let btn = document.createElement('button')
        btn.classList.add('preset')
        let [name, time] = [elm.name, elm.time]
        let [h, m, s] = [time >= 3600 ? Math.floor(time / 3600) : 00, 
                            Math.floor(time % 3600 / 60), time % 60]
        let timeToFormat = 
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
        let br = document.createElement('br')
        btn.append(name, br, timeToFormat)
        el.timers.append(btn)
        btn.addEventListener('click', () => {
            remainingSeconds = time
            updateInterfaceTime()
        })
    })
}

updateTimerPresets()

let interval = null
remainingSeconds = 0

el.control.addEventListener('click', () => {
    if (interval === null) {
        start()
    } else {
        stop()
    }
})

el.set.addEventListener('click', () => {
    const inputMinutes = prompt('Enter Minutes:')

    if (inputMinutes) {
        stop()
        remainingSeconds = inputMinutes * 60
        updateInterfaceTime()
    }
})

el.addTimer.addEventListener('click', () => {
    alert("I will add this feature soon..")
})

let updateInterfaceTime = () => {
    
    const hours = remainingSeconds >= 3600 ? 
                  Math.floor(remainingSeconds / 3600) :
                  0
    const minutes = Math.floor((remainingSeconds % 3600) / 60)
    const seconds = remainingSeconds % 60

    el.hours.textContent = hours.toString().padStart(2, '0')
    el.minutes.textContent = minutes.toString().padStart(2, '0')
    el.seconds.textContent = seconds.toString().padStart(2, '0')
}

let updateInterfaceControls = () => {
    if (interval === null) {
        el.control.textContent = 'Start'
        el.control.classList.remove('pause')
    } else {
        el.control.textContent = 'Pause'
        el.control.classList.add('pause')
    }
}

let start = () => {
    if (remainingSeconds === 0) {
        alert('Please set timer first.')
        return
    }

       interval = setInterval(() => {
            remainingSeconds--
            updateInterfaceTime()

        if (remainingSeconds === 0) {
            stop()
            }
        }, 1000)
        updateInterfaceControls()
    
}

let stop = () => {
    clearInterval(interval)
    interval = null
    updateInterfaceControls()
}

