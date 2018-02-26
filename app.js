let score, activePlayer, roundScore, gamePlaying, previousDice_1, previousDice_2, winningScore;

init();

document.querySelector(".btn-roll").addEventListener('click', () => {
	if (gamePlaying === true){
	//1. display a random number.
	let dice_1 = Math.floor(Math.random() * 6) + 1; //Math.random in js gives a random value b/w 0 and 1 . To produce a random value b/w 1 and 6 we do this.
	//dice is declared here, because we dont want the outside scope to accesss it.
	let dice_2 =  Math.floor(Math.random() * 6) + 1;
	//2. display the img according to the number
	let diceDOM_1 = document.querySelector(".dice_1");
	diceDOM_1.style.display = 'block';
	diceDOM_1.src = 'dice-' + dice_1 + '.png';
	let diceDOM_2 = document.querySelector(".dice_2");
	diceDOM_2.style.display = 'block';
	diceDOM_2.src = 'dice-' + dice_2 + '.png';
	//3. update the score globally IF the rolled number is not one, or holed
	if ((dice_1 !== 1) && (dice_2 !== 1)){
		// add the number
		if ((dice_1 == previousDice_1 && previousDice_1 == 6 )||(dice_2 == previousDice_2 && previousDice_2 == 6)){
				roundScore = 0
				score[activePlayer] = roundScore;
				document.querySelector('#score-' + activePlayer).textContent = '0'
				nextPlayer();
		} else {
		roundScore += dice_1 + dice_2;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
	} else {
		nextPlayer();
		}
	previousDice_1 = dice_1;
	previousDice_2 = dice_2;
	}
})

document.querySelector('.btn-hold').addEventListener('click', () => {
	if (gamePlaying === true){
	//1. add the CURRENT score to  the GLOBAL score
	score[activePlayer] += roundScore;

	//2. update the UI
	document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
	document.querySelector('.dice_2').style.display = 'none'
	document.querySelector('.dice_1').style.display = 'none'

	//3. check if the player has won
	if (score[activePlayer] >= winningScore){ 
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
		document.getElementById('name-' + activePlayer).textContent = 'WINNER...!'
		document.querySelector('.dice_2').style.display = 'none'
		document.querySelector('.dice_1').style.display = 'none'
		gamePlaying = false
		document.querySelector('#current-' + activePlayer).textContent = '0';
	} else{
		nextPlayer();
		}
	}
})

function nextPlayer() {
	// update the player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		// we could also have used document.querySelector('.player-0-panel').classList.add('active')
		// and document.querySelector('.player-1-panel').classList.remove('active') to change but , then we would have to use it in the if else
		// block, to change the players accordingly if the active player is 0 or 1

		document.querySelector('.dice').style.display = 'none';

		return activePlayer, roundScore
}

document.querySelector('.btn-new').addEventListener('click', init)


function init() {

	score = [0,0];
	activePlayer = 0;
	roundScore = 0;
	currentDice = 0;
	gamePlaying = true; // a state variable used to define the conditions what happen only if game is being played
	/*
	document.querySelector("#current-" + activePlayer).textContent = dice; //but it just writes the text and no html. for html content,
	// we use document.querySelector("#current-" + activePlayer).innerHTML = '<b>'+ dice+ '</b>';

	var x = document.querySelector("#score-0").textContent; // to read the content from html page.
	console.log(x); 
	*/
	winningScore = prompt("Enter the winningScore..?")

	document.querySelector(".dice_1").style.display = 'none'; //to change the style.
	document.querySelector(".dice_2").style.display = 'none'; //to change the style.
	
	document.getElementById('score-1').textContent = '0'; //just another method to select only ID's. we could have query selector here.
	// however , getElementById is a little fast.
	document.querySelector('#score-0').textContent = '0';
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';
	document.querySelector('#name-0').textContent = 'PLAYER-1';
	document.querySelector('#name-1').textContent = 'PLAYER-2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active')

}




