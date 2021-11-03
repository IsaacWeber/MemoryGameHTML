let divs = document.querySelectorAll("div#canvas div"); //getting divs

let selectedDivs = ['-', '-', '-', '-', '-', '-', '-', '-',
	'-', '-', '-', '-', '-', '-', '-', '-'];	//selected divs

const CLOUD = 0, FLOWER = 1, HEART = 2, HOUSE = 3,
	MAN = 4, ROAD = 5, TOMATO = 6, WOMAN = 7; //possible bgs

let selectedBgs = ['-', '-', '-', '-', '-', '-', '-', '-']; //selected backgrounds

let bgDivNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//number of the specific bg div ( 16 divs )
//this is a map

var divBG1V = -1, divBG2V = -1;
var divIndex1 = -1, divIndex2 = -1;
// console.log( typeof(div1Selected), typeof(div2Selected))

function startGame() { //change bg divs and configs about this
	let index = 0; //the first is 0
	do { //adding bgs into divs
	
		index = getRandomInt(0, 16); //turn index inside interval [0, 16[
	
		if (selectedDivs[index] == '-') {
	
			bgDivNumber[index] = getPossibleBgNumber();
			//console.log( getPossibleBgNumber() );
			//setBackground( index ); //set background 
			selectedDivs[index] = 's'; //chage from '-' to 's'
			selectedBgs[bgDivNumber[index]] = 's';
		}
	
	
	
		//console.log( bgDivNumber );
	} while (!isAllSelected(selectedDivs));

}

// console.log(selectedBgs);
// console.log(selectedDivs);
// console.log(bgDivNumber);
//console.log( bgDivNumber );
//---------------------- ON CLICK HANDLER 

//this form doesn't work
/*
for( let i = 0; i < divs.length; ++i ) {

	divs[ i ].onclick = function() {
		console.log( i );
		setBackground( i );
		
		
	};
	
	
}
*/

startGame();

let usedDivs = ['-', '-', '-', '-', '-', '-', '-', '-',
	'-', '-', '-', '-', '-', '-', '-', '-']
var blocked = false; //global vars
var gameEnded = false;

for (let count = 0; count < divs.length; ++count) {
	let divNumber = undefined;
	divs[count].addEventListener('click', function () { //onclick at some div

		if (!blocked) { //if it is not blocked
	
			divNumber = getNumberById(this.id);
			//console.log( this.id );
			//console.log( divs.length );
			//console.log( getNumberById( this.id ) );

			if (divBG1V == -1 && usedDivs[divNumber] === '-') {
				divBG1V = bgDivNumber[divNumber];
				divIndex1 = divNumber;
				usedDivs[divNumber] = 's';
				setBackground(divNumber);
			} else if (divBG2V == -1 && usedDivs[divNumber] === '-') {
				divBG2V = bgDivNumber[divNumber];
				divIndex2 = divNumber;
				usedDivs[divNumber] = 's';
				setBackground(divNumber);

				if (divBG1V != divBG2V) {
					usedDivs[divIndex1] = '-';
					usedDivs[divIndex2] = '-';

					blocked = true; //bloked while finish out 'setTimeout' function

					setTimeout(() => {
						divs[divIndex1].style.background = 'rgba(200, 200, 200, .8)';
						divs[divIndex2].style.background = 'rgba(200, 200, 200, .8)';
						divBG1V = -1;
						divBG2V = -1;
						divIndex1 = -1;
						divIndex2 = -1
					}, 350); //wait 350ms and restart divs
					
					blocked = false;

				}else {//
					divBG1V = -1;
					divBG2V = -1;
					divIndex1 = -1;
					divIndex2 = -1
					
					if(isAllSelected(usedDivs)){ //all divs were selected
						blocked = true; //unblock when clicked yesbutton (see yesButton handler as needed)
						gameEnded = true;
						restart();
						
					} 
					
				}
			}
		}

	});

	divs[count].addEventListener('mouseover', function () {
		if(!gameEnded) {
			let n = getNumberById(this.id);
			if(usedDivs[n] === 	'-') {
				bgNumber = bgDivNumber[n]; //get bg number
				if (bgNumber != divBG1V && bgNumber != divBG2V) { //if it doesnt have a bg image	
					this.style.background = 'rgba(200, 200, 200, 1)';
				}
			}
		}
	});

	divs[count].addEventListener('mouseout', function () {
		if(!gameEnded) {
			let n = getNumberById(this.id);
			if(usedDivs[n] === 	 '-') {
				bgNumber = bgDivNumber[n]; //get bg number
				if (bgNumber != divBG1V && bgNumber != divBG2V) { //if it doesnt have a bg image	
					this.style.background = 'rgba(200, 200, 200, .8)';
				}
			}
		}
	});

}

function restart() {
	selectedDivs = ['-', '-', '-', '-', '-', '-', '-', '-',
	'-', '-', '-', '-', '-', '-', '-', '-'];
	usedDivs = ['-', '-', '-', '-', '-', '-', '-', '-',
	'-', '-', '-', '-', '-', '-', '-', '-'];
	selectedBgs = ['-', '-', '-', '-', '-', '-', '-', '-'];
	bgDivNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	setTimeout(createRestartFrame(), 800);

}

function createRestartFrame() {
	let body = document.querySelector('body');
	body.style.backgroundColor = 'beige';
	document.getElementById('game-title').style.color = 'rgba(180, 180, 180, 1)';	
	
	let restartDivRemoved = false;

	divs.forEach((item) => {
		item.style.borderColor = 'rgba(255, 255, 255, .1)'; //light gray
	});

	let restartDiv = document.createElement('div');
	restartDiv.innerHTML= 'Play Again?<br/>';
	restartDiv.classList.add('restart-div');

	let yesButton = document.createElement('button');
	yesButton.setAttribute('type', 'button');
	yesButton.setAttribute('class', 'button');
	yesButton.innerText = 'yes';

	yesButton.addEventListener('click', () => { //start a new game
		body.style.backgroundColor = 'rgba( 0, 190, 0, 1 )';
		document.getElementById('game-title').style.color = 'black';
		divs.forEach((item) => {
			item.style.background = 'rgba(200, 200, 200, .8)';
			item.style.borderColor = 'black'; //light gray
		});
		restartDiv.remove();
		startGame();
		blocked = false; //unblock
		gameEnded = false; //game restarted
	} );

	let message = document.getElementById('message'); //message to user replay
	message.classList.add('message');

	let noButton = document.createElement('button');
	noButton.setAttribute('type', 'button');
	noButton.setAttribute('class', 'button')
	noButton.innerText = 'no';
	
	noButton.addEventListener('click', () => {
		restartDiv.remove();
		restartDivRemoved = true;
		message.innerText = 'Press R or ESC to play again!';
	});

	let closeButton = document.createElement('button');
	closeButton.setAttribute('type', 'button');	
	closeButton.setAttribute('class', 'button');
	closeButton.innerText = 'close';

	closeButton.addEventListener('click', () => {
		restartDiv.remove(); 
		restartDivRemoved = true;
		message.innerText = 'Press R or ESC to play again!';
	});

	document.addEventListener('keyup', (e) => {
		if(gameEnded) {
			if(e.key === 'Escape' || e.key === 'r') {
				if(restartDivRemoved) {
					createRestartFrame();
					restartDivRemoved = false;
					message.innerText = '';
				}
			}
		}
		
	});

	restartDiv.append(yesButton, noButton, closeButton);

	document.querySelector('body').appendChild(restartDiv);
}


function getNumberById(id) {

	let number = undefined; //number to return

	for (let clmn = 0; clmn <
		(divs.length / 2); ++clmn) { //walk along divs array

		if (id.localeCompare("l1" + (clmn + 1)) == 0) {

			number = clmn; //div number ( 0 -- 7 )
			break; //braek loop

		} else if (id.localeCompare("l2" + (clmn + 1)) == 0) {
			number = clmn + 8; // 8 -- 15 
			break;
		}

	}


	return number;

}
//----------------


// ---- functions 

//choose [ min, max [
function getRandomInt(minimum, maximum) {

	let randValue;

	Math.ceil(minimum);
	Math.floor(maximum);

	randValue = Math.floor(Math.random() * (maximum - minimum)) + minimum;

	return randValue;


}

//verify if all elements are selecteds
function isAllSelected(array) {

	let count = 0;


	for (let i = 0; i < array.length; ++i) {

		if (array[i] == 's') {
			++count;
		}

	}


	if (count == array.length) {
		return true;
	} else {
		return false;
	}

}


function getPossibleBgNumber() {

	let possible = undefined;

	if (isAllSelected(selectedBgs)
		&& !isAllSelected(selectedDivs)) { //if all bgs were selected, do it a second time

		selectedBgs = ['', '', '', '', '', '', '', ''];;

	}

	if (!isAllSelected(selectedBgs)) {

		for (let count = 0;
			count < selectedBgs.length; ++count) {

			if (selectedBgs[count] != 's') {
				possible = count;
				break;
			}

		}

	}



	return possible;

}

function getBgPath(number) {

	let path = undefined;

	switch (number) {

		case CLOUD:
			path = "url( '../css/images/cloud.png' )";
			break;

		case FLOWER:
			path = "url( '../css/images/flower.png' )";
			break;

		case HEART:
			path = "url( '../css/images/heart.png' )";
			break;

		case HOUSE:
			path = "url( '../css/images/house.png' )";
			break;

		case MAN:
			path = "url( '../css/images/man.png' )";
			break;

		case ROAD:
			path = "url( '../css/images/road.png' )";
			break;

		case TOMATO:
			path = "url( '../css/images/tomato.png' )";
			break;

		case WOMAN:
			path = "url( '../css/images/woman.png' )";
			break;

	}

	return path;

}


//set the background in div
function setBackground(divIndex) {

	//console.log( divs[ divIndex ] );

	/* configure this */
	divs[divIndex].style.background = "rgba( 200, 200, 200, .8 ) "
		+ getBgPath(bgDivNumber[divIndex]) + " center/65% no-repeat";
	//divs[ divIndex ].style.opacity = "0";


	// selectedBgs[ possibleBgN ] = 's'; //marked up as selected


}
