import { jackData } from "./data.js";

// variables
const emotionsContainer = document.getElementById('emotions-container')
const getGifBtn = document.getElementById('get-gif-btn')
const gifContainer = document.getElementById("gif-container")
const gifDisplay = document.getElementById("gif-display")
const closeGif = document.getElementById("close-gif")
const closeSmallGif = document.getElementById('close-small-gif')
const isGif = document.getElementById("isGif")
const isGifDiv = document.getElementById('isGif-div')
const gifSmallDisplay = document.getElementById('gif-small-display')
const gifSmallBox = document.getElementById('gif-small-box')

// get all emotion tags from the jackData
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

// extracting only emotions and creating labels and inputs
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

// displaying emotions on the page
function renderEmotions(data){
    const emotionEl = getEmotions(data)
    return emotionsContainer.innerHTML = emotionEl
}
renderEmotions(jackData)

// event to get which emotion is selected
emotionsContainer.addEventListener('change', getSelectedEmotion)

function getSelectedEmotion(){
    const radios = document.getElementsByClassName("emotion")
    for(let radio of radios){
        radio.parentElement.classList.remove("checked")
    }
    document.querySelector('input[type="radio"]:checked').parentElement.classList.add('checked')
}

getGifBtn.addEventListener('click', displayGif)

emotionsContainer.addEventListener('change', displayGif)

function displayGif(){
    if(gifContainer.innerHTML !== ""){
        getGifBtn.disabled = false
        getGifBtn.classList.remove('disabled')
        getGifBtn.style.cursor = 'pointer'
        
    }
}

getGifBtn.addEventListener('click', getGif)

isGifDiv.addEventListener('change', getImages)

function getImages(){
    const emotionId = document.querySelector('input[type="radio"]:checked').id
    
    let isGifChecked = isGif.checked
    
    let imageArray = jackData.filter((item)=> {
        return item.emotionTags.includes(emotionId) && (!isGifChecked || item.isGif)
    })

    return imageArray
}

function getGif(){
    let imageUrl = ``
    const imagesArray = getImages()
    
    for(let item of imagesArray){
        
        imageUrl += `
            <img src="/images${item.image}" alt="${item.alt}" class="gif" loading="lazy">
            ` 
    }
    gifContainer.innerHTML = imageUrl

    if(gifContainer.innerHTML !== ""){
        gifDisplay.style.display = 'block'
        getGifBtn.style.cursor = "not-allowed"
        getGifBtn.disabled = true
    }

    document.addEventListener('click', (e)=> {
     if(e.target.tagName !== "BUTTON" && gifDisplay.style.display === 'block'){
        if(!gifDisplay.contains(e.target) && e.target !== gifDisplay){
            if(!gifSmallDisplay.contains(e.target) && e.target !== gifSmallDisplay){
                gifDisplay.style.display = "none"
                gifSmallDisplay.style.display = "none"
                getGifBtn.style.cursor = "pointer"
                getGifBtn.disabled = false
            }
        }
    }
})
}

closeGif.addEventListener("click", closeGifDiv)
closeSmallGif.addEventListener("click", closeSmallDiv)

function closeSmallDiv(){
    gifSmallDisplay.style.display = "none"
}

function closeGifDiv() {
    gifSmallDisplay.style.display = "none"
    gifDisplay.style.display = "none"
    getGifBtn.style.cursor = "pointer"
    getGifBtn.disabled = false
}

gifContainer.addEventListener('click', (e)=> {
    if(e.target.tagName === "IMG"){
        gifSmallBox.innerHTML = `
            <img src="${e.target.src}" alt="" class="gif-small">
        `
        gifSmallDisplay.style.display = 'block'
    }
})