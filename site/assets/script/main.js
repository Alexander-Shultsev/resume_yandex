const header = document.querySelector('.header_main');
const headerBlock = document.querySelector('.header_main__block');

function __init__() {
    window.addEventListener('wheel', next);

    header.style.top = -Number(headerBlock.style.height.slice(0, -2)) + 'px';

    console.log(headerBlock.style.height);
}

let cuttentScroll = 0;
const scrollOne = 3;

const anumationList = new Map([
    ['anumation_my_name', '1'],
    ['show_header', 8],
]);

// Функция выполения следующего действия
function next(event) {
    if (event.deltaY > 0) {
        cuttentScroll++;
        
        if (cuttentScroll == anumationList.get('anumation_my_name')) {
            anumationMyName();
        }

        if (cuttentScroll == anumationList.get('show_header')) {
            showHeader();
        }
    }
}

// -- Анимация изменения текста заголовка с английского на русский
const myName = [
    document.querySelector('.my_name__text.en'),
    document.querySelector('.my_name__text.ru')
];

const myNameRotationMax = 90; // максимальное значние поворота
const myNameEnOpacityFinish = 60; // окончание анимации изчезания у английского текта

const myNameOpacityOne = [
    1 / myNameEnOpacityFinish,
    1 / myNameRotationMax,
];

let myNameRotation = [0, -myNameRotationMax];
let myNameOpacity = [1, 0];

function anumationMyName() {
    changeRotateX(myName[0], myNameRotation[0]);
    changeRotateX(myName[1], myNameRotation[1]);
    
    changeOpacity(myName[0], myNameOpacity[0]);
    changeOpacity(myName[1], myNameOpacity[1]);
    
    if (myNameRotation[0] != myNameRotationMax) { 
        requestAnimationFrame(anumationMyName);
    }

    myNameRotation[0]++;
    myNameRotation[1]++;
    
    myNameOpacity[0] -= myNameOpacityOne[0];
    myNameOpacity[1] += myNameOpacityOne[1];
}

function changeRotateX(elem, rotation) {
    elem.style.transform = `rotateX(${rotation}deg)`;
}

function changeOpacity(elem, opacity) {
    elem.style.opacity = opacity;
}


// Анимация выпливания шапки
function showHeader() {

}

__init__();
