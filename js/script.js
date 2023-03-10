const btn = document.getElementById('start');
const green = document.getElementById('green');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const red = document.getElementById('red');
const colors = {
	green,
	yellow,
	blue,
	red
}
let colorsArray = [];
let level = 0;
let clicks = 0;
const totalRounds = 10;
const time = 750;
const timeM = 1500;
const deleteColor = 350;
const numColors = 4;
const sounds = [
	new Audio('../sounds/do.mp3'),
	new Audio('../sounds/re.mp3'),
	new Audio('../sounds/mi.mp3'),
	new Audio('../sounds/si.mp3'),
	new Audio('../sounds/celebracion.mp3'),
	new Audio('../sounds/fail.mp3')
];

////////////////////
getEventListeners();
disableOnclickEvent();
document.getElementById("best").innerHTML = `Rounds ${totalRounds}`;
///////////////////

function getEventListeners() {
	green.addEventListener('click', verifyMatch);
	yellow.addEventListener('click', verifyMatch);
	red.addEventListener('click', verifyMatch);
	blue.addEventListener('click', verifyMatch);
}

function startGame() {
	enableOnclickEvent();
	getSequency();
	level = 0;
	clicks = 0;
	btn.style.pointerEvents = "none";
	paintSequence();
}

function getSequency() {
	colorsArray = new Array(totalRounds);
	colorsArray = colorsArray.fill(0);
	colorsArray = colorsArray.map(n => Math.floor(Math.random() * numColors));
}

function verifyMatch(e) {
	const colorName = e.target.dataset.color;
	const colorNumber = colorToNumber(colorName);
	sounds[colorNumber].play();
	paintColor(colorName);

	if (colorNumber === colorsArray[clicks]) {
		clicks++;
		if (clicks > level) {
			level++;
			document.getElementById("level").innerHTML = `Current level ${level}`;
			if (level === totalRounds) {
				celebration();
				finishGame();
			} else {
				clicks = 0;
				setTimeout(paintSequence, timeM);
			}
		}
	} else {
		youLose();
		finishGame();
	}
}

function finishGame() {
	btn.style.pointerEvents = "auto";
	level = -1;
	setTimeout(() => window.location.reload(), 5000);
}

function paintSequence() {
	for (let i = 0; i <= level; i++) {
		const color = numberToColor(colorsArray[i]);
		setTimeout(() => paintColor(color), time * i);
	}
}

function paintColor(color) {
	colors[color].classList.add('light');
	setTimeout(() => unpaintColor(color), deleteColor);
}

function unpaintColor(color) {
	colors[color].classList.remove('light');
}

function numberToColor(number) {
	switch (number) {
		case 0: return 'red';
		case 1: return 'green';
		case 2: return 'yellow';
		case 3: return 'blue';
	}
}

function colorToNumber(color) {
	switch (color) {
		case 'red': return 0;
		case 'green': return 1;
		case 'yellow': return 2;
		case 'blue': return 3;
	}
}

function disableOnclickEvent() {
	green.style.pointerEvents = "none";
	red.style.pointerEvents = "none";
	yellow.style.pointerEvents = "none";
	blue.style.pointerEvents = "none";
}

function enableOnclickEvent() {
	green.style.pointerEvents = "auto";
	red.style.pointerEvents = "auto";
	yellow.style.pointerEvents = "auto";
	blue.style.pointerEvents = "auto";
}

function celebration() {
	document.getElementById("title").innerHTML = 'Simon says: You Won! 🥳';
	sounds[4].play();
}

function youLose() {
	document.getElementById("title").innerHTML = 'Simon says: You lose! 😵‍💫';
	sounds[5].play();
}

