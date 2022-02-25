
// класс для одного символа на экране
class ElemAmin {
    elem;
    position = [0, 0];

    constructor(letter, startPosition) {
        this.elem = document.createElement('span');
        this.elem.className = 'elemAnim';
        this.elem.innerHTML = letter;
        this.elem.style.left = startPosition[0] + 'px';
        this.elem.style.top = startPosition[1] + 'px';

        this.position[0] = startPosition[0];
        this.position[1] = startPosition[1];

        this.elem.style.transform = `rotate(${allElemDirection}deg)`;

        document.body.prepend(this.elem);
    }

    changePosition(dotBias) { // изменить позицию элемента на определённое количесво пикселей
        this.position[0] += dotBias[0];
        this.position[1] += dotBias[1];

        this.elem.style.left = this.position[0] + 'px';
        this.elem.style.top = this.position[1] + 'px';
    }

    newPosition(coordinate) { // указать новую позицию элемента
        this.position[0] = coordinate[0];
        this.position[1] = coordinate[1];

        this.elem.style.left = this.position[0] + 'px';
        this.elem.style.top = this.position[1] + 'px';
    }

    changeRotation() {
        this.elem.style.transform = `rotate(${allElemDirection}deg)`;
    }
}


let mainDocument = document.documentElement;
let screenWinth = mainDocument.clientWidth;
let screenHeight = mainDocument.clientHeight;

let screenCenter = [0, 0]; // центр эккрана
let dotBias = [0, 0]; // смещение точки
let mousePosition = [0, 0]; // положние мыши
let mouseDistanceFromCenter = [0, 0]; // расстояние от центра экрана до мышки

let allElem = []; // список всех элементов на экране
let allElemCount = 40; // количество элементов
let allElemDirection = 0; // поворот отдельного симовола относительно своей оси
const grRad = Math.PI/180; // отношение радин к градусам

const letterVariants = ['&', '{ }', '[ ]', '( )', '+=']; // список возможных вариантов символов
let randomVariants; // первоначальный символ
let randomPosition = [0, 0]; // первоначальная позиция элемента при старте программы
let newPosition = 0; // рандомная позия, задаваемая при пересечении элементом границы
let checkPosition = [0, 0]; // значение позции для проверки захода за границу (добавляется для уменьшения кода)

let elemSize = 100;


// функция рассчёта коордитан центра экрана
function changeScreenSize() {
    screenWinth = mainDocument.clientWidth;
    screenHeight = mainDocument.clientHeight;

    screenCenter[0] = screenWinth / 2;
    screenCenter[1] = screenHeight / 2;
}

// функция start
function start() {
    changeScreenSize();

    for(let i = 0; i < allElemCount; i++) {
        randomVariants = letterVariants[randomInt(0, letterVariants.length)];
        randomPosition[0] = randomInt(0, screenWinth);
        randomPosition[1] = randomInt(0, screenHeight);

        allElem[i] = new ElemAmin(randomVariants, [randomPosition[0], randomPosition[1]]);
    }

    window.addEventListener('resize', changeScreenSize);
}

// функция animate
function animate() {
    for(let i = 0; i < allElemCount; i++) {
        checkOut(i);
        allElem[i].changePosition([dotBias[0], dotBias[1]]);
        allElem[i].changeRotation();
    }

    requestAnimationFrame(animate);
}

// Функция проверки, зашёл ли элемент за границу 
function checkOut(i) {
    checkPosition[0] = allElem[i].position[0];
    checkPosition[1] = allElem[i].position[1];

    if (checkPosition[0] > screenWinth) { // если элемент заходит за правый край
        elemReplase(i, 1);
    } 
    if (checkPosition[1] > screenHeight) { // если элемент заходит за нижний край
        elemReplase(i, 2);
    }
    if (checkPosition[0] < -1 * elemSize) { // если элемент заходит за левый край
        elemReplase(i, 3);
    }
    if (checkPosition[1] < -1 * elemSize) { // если элемент заходит за верхний край
        elemReplase(i, 4);
    }
}

// Функция для перемещения элемента после его захода за край экрана
function elemReplase(i, screenPart) {
    switch(screenPart) {
        case 1: {
            newPosition = randomInt(0, screenHeight);
            allElem[i].newPosition([-1 * elemSize, newPosition]);
            break;
        }
        case 2: {
            newPosition = randomInt(0, screenWinth);
            allElem[i].newPosition([newPosition, -1 * elemSize]);
            break;
        }
        case 3: {
            newPosition = randomInt(0, screenHeight);
            allElem[i].newPosition([screenWinth, newPosition]);
            break;
        }
        case 4: {
            newPosition = randomInt(0, screenWinth);
            allElem[i].newPosition([newPosition, screenHeight]);
            break;
        }
    }
}

// функция, запускаемая при движении мыши
document.onmousemove = function(event) {
    mousePosition[0] = event.pageX;
    mousePosition[1] = event.pageY;

    mouseDistanceFromCenter[0] = changeMouseDistanceFromCenter(0);
    mouseDistanceFromCenter[1] = changeMouseDistanceFromCenter(1);

    dotBias[0] = mouseDistanceFromCenter[0] * (-0.01);
    dotBias[1] = mouseDistanceFromCenter[1] * (-0.01);

    changeDirection(mouseDistanceFromCenter[0], mouseDistanceFromCenter[1]);
}

// функция изменения расстояния мышки ои центра экрана
function changeMouseDistanceFromCenter (position) {
    return mousePosition[position] - screenCenter[position];
}

// функция вычисления рандомного значения
function randomInt (min, max) {
    return Math.floor(Math.random() * max) + min;
}

// функция изменения угла поворота всех симовола
function changeDirection (x, y) {
    if (x > 0 && y < 0) { // 1 четверть
        allElemDirection = 270 - changeDirectionPart();
    }
    if (x > 0 && y > 0) { // 2 четверть
        allElemDirection = 270 + changeDirectionPart();
    }
    if (x < 0 && y > 0) { // 3 четверть
        allElemDirection = 90 - changeDirectionPart();
    }
    if (x < 0 && y < 0) { // 4 четверть
        allElemDirection = 90 + changeDirectionPart();
    }
}

// функция вычисления угла
function changeDirectionPart() {
    return Math.abs(
                Math.atan(
                     mouseDistanceFromCenter[1] / mouseDistanceFromCenter[0]
                ) / grRad
            );
}

start();
animate();