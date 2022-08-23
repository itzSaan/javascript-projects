const textareaInput = document.getElementById("textareaInput")
const status = document.getElementById("status")
const lang = document.getElementById("lang")

// console.log(lang.value)

function handleMic(img) {
if (window.hasOwnProperty('webkitSpeechRecognition')) {
    var recognition = new webkitSpeechRecognition()
    
    recognition.continuous = false
    recognition.lang = lang.value
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.start()  
    status.style.removeProperty("color")
    status.innerText = `Listening... you selected lang:${lang.value}`
    img.src = "images/mic-red.png"

    let speechs = [" "]
    recognition.onresult = (e) => {
        // console.log(e.results[0][0].transcript)
        if(e) {
            speechs.push(e.results[0][0].transcript)
            if(speechs.length) {
                for(let i = 0; i < speechs.length; i++) {
                    textareaInput.value +=  speechs[i]
                }                
            }
        }
        img.src = "images/mic.png"
       
        
        
        status.innerText = `Stopped listening. Press again to Speak
        Confidence: ${Math.round(e.results[0][0].confidence * 100)}%` 
        }

    
    recognition.onerror = (e) => {
        status.innerText = `There is some error: ${e.error}
                         Additional information: ${e.message}` 
        e.error ? status.style.color = "red" : ""
        img.classList.add("animate__shakeX")
        recognition.stop() 
        img.src = "images/mic.png"     
    }
        
    }

}


function clearText() {
    textareaInput.value = ""
}

function copyText() {
    textareaInput.select()
    textareaInput.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(textareaInput.value)
}