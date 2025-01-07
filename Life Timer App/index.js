let isDobOpen = false;
let dateOfBirth;
const settingIconEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDobBtnEl = document.getElementById("afterDobBtn");
const dobBtnEl = document.getElementById("dobBtn");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
    "image6.jpg",
    "image7.jpg",
    "image8.jpg",
    "image9.jpg",
    "image10.jpg"
];



const randomBackgroundImg = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const imagePath = "images/" + images[randomIndex];
    const backgroundEl = document.getElementById("backgroundimg");

    backgroundEl.style.backgroundImage = `url(${imagePath})`;
};

window.onload = () => {
    randomBackgroundImg();
    setInterval(randomBackgroundImg, 5000);
};

const makeTwoDigit = (number) => {
    return number > 9 ? number : `0${number}`;
};

const toggleDobSelector = () => {
    if (isDobOpen) {
        settingContentEl.classList.add("hide");
    } else {
        settingContentEl.classList.remove("hide");
    }

    isDobOpen = !isDobOpen;

};

const updateAge = () => {
    const currentDate = new Date();
    const dateDiff = currentDate - dateOfBirth;
    const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365) % 12);
    const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24) % 30);
    const hour = Math.floor(dateDiff / (1000 * 60 * 60) % 24);
    const minute = Math.floor(dateDiff / (1000 * 60) % 60);
    const second = Math.floor(dateDiff / (1000) % 60);

    yearEl.innerHTML = makeTwoDigit(year);
    monthEl.innerHTML = makeTwoDigit(month);
    dayEl.innerHTML = makeTwoDigit(day);
    hourEl.innerHTML = makeTwoDigit(hour);
    minuteEl.innerHTML = makeTwoDigit(minute);
    secondEl.innerHTML = makeTwoDigit(second);

};

const localStorageGetter = () => {
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const date = localStorage.getItem("date");
    const hour = localStorage.getItem("hour");
    const minute = localStorage.getItem("minute");
    const second = localStorage.getItem("second");

    if(year && month && date && hour && minute && second){
        dateOfBirth = new Date(year, month, date, hour, minute, second);   
    
        }
        updateAge();
};

const contentToggler = () =>{
    updateAge();
    if(dateOfBirth){
        
        initialTextEl.classList.add("hide");
        afterDobBtnEl.classList.remove("hide");
        
        
    }else{
        afterDobBtnEl.classList.add("hide");
        initialTextEl.classList.remove("hide");
    }
};

const setDOBHandler = () => {
    const dateString = dobInputEl.value;
    dateOfBirth = dateString ? new Date(dateString) : null;

   

        console.log({dateOfBirth});

    if (dateOfBirth) {
        localStorage.setItem("year", dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth());
        localStorage.setItem("date", dateOfBirth.getDate());
        localStorage.setItem("hour", dateOfBirth.getHours());
        localStorage.setItem("minute", dateOfBirth.getMinutes());
        localStorage.setItem("second", dateOfBirth.getSeconds());
        initialTextEl.classList.add("hide");
        afterDobBtnEl.classList.remove("hide");
    }
    
    contentToggler();
    setInterval(() => updateAge(), 1000);

};

localStorageGetter();
contentToggler();


settingIconEl.addEventListener("click", toggleDobSelector);
dobBtnEl.addEventListener("click", setDOBHandler);