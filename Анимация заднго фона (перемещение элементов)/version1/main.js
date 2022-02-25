// // start parametrs


// // lets

// let stepCount = 0;
// let maxCount = 20;
// let direction;

// // main

// function drawDot() {
//     mc.clearRect(0, 0, screenWinth, screenHeight);
//     if (stepCount == 0) {
//         stepCount = Math.floor(Math.random() * maxCount) + 5;
//     }
// }

// drawDot();


// lets

let mainCanvas = document.getElementById('main_canvas');
let mc = mainCanvas.getContext('2d');

let mainDocument = document.documentElement;
let screenWinth = mainDocument.clientWidth;
let screenHeight = mainDocument.clientHeight;

const grRad = Math.PI/180; // отношение радин к градусам

let dotDistanceFromCenter = [0, 0]; // положение точки в пространстве
let mousePosition = [0, 0]; // положние мыши
let screenCenter = [0, 0]; // центр эккрана
let mouseFromCenterDistance = [0, 0]; // расстояние от центра экрана до мышки
let direction = 0; // угол движения
let dX = 0; // изменение x за такт анимации


// функция рассчёта коордитан центра экрана
function changeCanvasSize() {
    screenWinth = mainDocument.clientWidth;
    screenHeight = mainDocument.clientHeight;

    mainCanvas.width = screenWinth; 
    mainCanvas.height =  screenHeight;

    screenCenter[0] = screenWinth / 2;
    screenCenter[1] = screenHeight / 2;
}


// функция start
function start() {
    changeCanvasSize();
    window.addEventListener('resize', changeCanvasSize);

    mc.fillStyle = 'red'; // цвет фигуры
    mc.fillRect(screenCenter[0], screenCenter[1], 15, 15); // стартовое положение фигуры          
}


// функция animate
function animate() {
    mc.clearRect(0, 0, 1000, 1000);

    /* вычисление положения X и Y */
    dotDistanceFromCenter[0] += dX;
    dotDistanceFromCenter[1] = Math.tan(direction * grRad) * dotDistanceFromCenter[0];

    mc.fillRect(
        screenCenter[0] + dotDistanceFromCenter[0], 
        screenCenter[1] + dotDistanceFromCenter[1], 15, 15
    );

    requestAnimationFrame(animate);
}

// функция, запускаемая при движении мыши
mainCanvas.onmousemove = function(event) {
    mousePosition[0] = event.offsetX;
    mousePosition[1] = event.offsetY;

    mouseFromCenterDistance[0] = changeMouseFromCenterDistance(0);
    mouseFromCenterDistance[1] = changeMouseFromCenterDistance(1);

    /* вычисление угла движения */
    direction = changeDirection();

    /* вычисление изменения X */
    dX = 1 / (direction / 10);

    console.log(dX);
}


// функция изменения угла
function changeDirection () {
    return Math.atan(
        mouseFromCenterDistance[1] / mouseFromCenterDistance[0]) / grRad;
}


// функция изменения расстояния мышки ои центра экрана
function changeMouseFromCenterDistance (position) {
    return screenCenter[position] - mousePosition[position];
}

start();
animate();