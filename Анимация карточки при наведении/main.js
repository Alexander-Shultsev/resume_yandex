const cards = document.querySelectorAll('.item');
let cardsItemCenter = [0, 0]; // центр каждого элемента

// первоначальное добавление событий на каждый элемент
for (let i = 0; i < cards.length; i++) {
    const cardsWrapper = cards[i];
    cardsWrapper.addEventListener('mousemove', startTransform);
    cardsWrapper.addEventListener('mouseout', endTransform);
}

// функция выполнение эффекта
function startTransform(event) {
    const cardsItem = this.querySelector('.item__card');
    cardsItemCenter[0] = cardsItem.offsetWidth / 2;
    cardsItemCenter[1] = cardsItem.offsetHeight / 2;

    cardsItem.style.transform = `
        rotateX(${-(event.offsetY - cardsItemCenter[1]) / 4}deg) 
        rotateY(${(event.offsetX - cardsItemCenter[0]) / 4}deg)
    `;
}

// функция остановки эффекта
function endTransform() {
    const cardsItem = this.querySelector('.item__card');
    cardsItem.style.transform = 'rotate(0)';
}