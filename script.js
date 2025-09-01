import { jackData } from "./data.js";

// variables
const emotionsContainer = document.getElementById('emotions-container')
// const gifDisplayMainContainer = document.getElementById("gif-display-main-container")
const getGifBtn = document.getElementById('get-gif-btn')
const gifContainer = document.getElementById("gif-container")
const gifDisplay = document.getElementById("gif-display-main-container")
const closeGif = document.getElementById("close-gif")

// console.log(jackData)
function getEmotionTags(emotionsData){
    const emotionsArray = []
    
    for(let data of emotionsData){
        for(let emotion of data.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function getEmotions(data){
    let emotions = ``

    const emotionsArrayContainer = getEmotionTags(data)
    for(let emotion of emotionsArrayContainer){
        emotions += `
            <div class="emotion-div">
                <label for="${emotion}">
                    ${emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                </label>
                <input 
                    type="radio" 
                    id="${emotion}"
                    name="emotion"
                    class="emotion"
                >
            </div>`
            }
    return emotions
}

function renderEmotions(data){
    const emotionEl = getEmotions(data)
    return emotionsContainer.innerHTML = emotionEl
}

emotionsContainer.addEventListener('change', getSelectedEmotion)

function getSelectedEmotion(){
    const radios = document.getElementsByClassName("emotion")
    for(let radio of radios){
        radio.parentElement.classList.remove("checked")
    }
    document.querySelector('input[type="radio"]:checked').parentElement.classList.add('checked')
}

renderEmotions(jackData)

// getGifBtn.addEventListener('click', displayGif)

// emotionsContainer.addEventListener('change', displayGif)

function displayGif(event){
    const imageArray = []
    let imageUrl = ``

    const emotionId = event.target.id
    for(let data of jackData){
        if(data.emotionTags.includes(emotionId)){
            imageArray.push(data.image)
        }
    }

    for(let image of imageArray){
        imageUrl += `
            <img src="/images${image}" class="gif">
        `
    }
    gifContainer.innerHTML = imageUrl
    console.log(imageUrl)
}

getGifBtn.addEventListener('click', getGif)

function getGif(){
    gifDisplay.style.display = 'block'
}

closeGif.addEventListener("click", closeGifDiv)

function closeGifDiv() {
    gifDisplay.style.display = "none"
}

// if(gifDisplay.style.display === 'block'){
//     document.body.addEventListener('click', (event)=>{
//         console.log(event.target)
//     } )
// }