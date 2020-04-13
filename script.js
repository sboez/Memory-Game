const cards = document.querySelectorAll('.memory-card');
const matchSound = new Audio('sounds/match.wav');
const flipSound = new Audio('sounds/flip.wav');

let isFlipped = false;
let locked = false;
let firstCard, secondCard;

function flipCard() {
	if (locked) return;
	if (this === firstCard) return;

	this.classList.add('flip');
	if (!isFlipped) {
		isFlipped = true;
		firstCard = this;
	} else {
		isFlipped = false;
		secondCard = this;
		checkMatch();
	}
	flipSound.play();
}

function checkMatch() {
	firstCard.dataset.framework === secondCard.dataset.framework ? disableCards() : unflipCards();
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	reset();
	setTimeout(() => matchSound.play(), 200);
}

function unflipCards() {
	locked = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		reset();
	}, 700);
}

function reset() {
	[isFlipped, locked] = [false, false];
	[firstCard, secondCard] = [null, null];
}

/* IIFE: Immediately Invoked Function Expression */
(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();

cards.forEach(card => card.addEventListener('click', flipCard));