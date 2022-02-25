let elem = document.querySelectorAll('.elem');

let mainDocument = document.documentElement;
let screenWinth = mainDocument.clientWidth;
let screenHeight = mainDocument.clientHeight;

let screenCenter = [0, 0]; // центр эккрана
let dotBias = [0, 0]; // смещение точки
let mousePosition = [0, 0]; // положние мыши
let dotPosition = [0, 0]; // положение точки в относительно центра
let mouseDistanceFromCenter = [0, 0]; // расстояние от центра экрана до мышки


// функция рассчёта коордитан центра экрана
function changeScreenSize() {
    screenWinth = mainDocument.clientWidth;
    screenHeight = mainDocument.clientHeight;

    screenCenter[0] = screenWinth / 2;
    screenCenter[1] = screenHeight / 2;

    elem[0].style.left = screenCenter[0] + 'px';
    elem[0].style.top = screenCenter[1] + 'px';
}

// функция start
function start() {
    changeScreenSize();
    window.addEventListener('resize', changeScreenSize);
}

// функция animate
function animate() {
    dotPosition[0] += dotBias[0];
    dotPosition[1] += dotBias[1];

    elem[0].style.left = dotPosition[0] + 'px';
    elem[0].style.top = dotPosition[1] + 'px';

    requestAnimationFrame(animate);
}

// функция, запускаемая при движении мыши
document.onmousemove = function(event) {
    mousePosition[0] = event.pageX;
    mousePosition[1] = event.pageY;

    mouseDistanceFromCenter[0] = changeMouseDistanceFromCenter(0);
    mouseDistanceFromCenter[1] = changeMouseDistanceFromCenter(1);

    dotBias[0] = mouseDistanceFromCenter[0] * (-0.01);
    dotBias[1] = mouseDistanceFromCenter[1] * (-0.01);

    console.log(mousePosition[0]);
}

// функция изменения расстояния мышки ои центра экрана
function changeMouseDistanceFromCenter (position) {
    return mousePosition[position] - screenCenter[position];
}

start();
animate();