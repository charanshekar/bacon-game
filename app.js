/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score=[], roundScore, activePlayer, gamePlaying, prevDice=[], limit;
limit = parseInt(document.getElementById("limit").textContent);
//score = [0,0];
init();
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<b> <em>' + dice + '</b> </em>';

document.getElementById('inpu').addEventListener('keypress', function(e){
    if (gamePlaying){
        if (e.key === 'Enter'){
            limit = document.getElementById('inpu').value;
            document.getElementById('limit').textContent = limit;

        }
    }
});

document.querySelector('.btn-roll').addEventListener('click', function() {
    //this is an Anonymous function passed as a Callback function.

    if(gamePlaying){
        //1. Random number generation
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //2. Display Dice image
        var diceDOM = [document.querySelector('.dice'), document.querySelector('.dice2')];
        diceDOM[0].style.display = 'block';
        diceDOM[0].src = 'dice-' + dice + '.png';
        diceDOM[1].style.display = 'block';
        diceDOM[1].src = 'dice-' + dice2 + '.png';

        //3. Update the roundScore IF the dice != 1;
        if ( !(dice === 1 || dice2 === 1) ){
            if (prevDice[0] === 6 && dice === 6){
                contSix();
            }
            else if ((prevDice[0] === 6) && (dice2 === 6)){
                contSix();
            }
            else if ((prevDice[1] === 6) && (dice === 6)){
                contSix(); 
            }  
            else if((prevDice[1] === 6) && (dice2 === 6)){
                contSix();
            }
            else {
                roundScore += dice + dice2;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
                prevDice[0] = dice;
                prevDice[1] = dice2;
            }
        }
        else{
            //next player
            //document.getElementById('game-info').innerHTML = "<b>OOPS! You rolled a 1</b>";
            window.alert("OOPS! You rolled a 1");
            playerToggler();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if(gamePlaying){
        score[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        //Check IF player won the game
        if (score[activePlayer] >= limit){
            document.getElementById('name-'+ activePlayer).textContent = 'Winner!';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.getElementById("inpu").disabled = true;
            gamePlaying = false;
        }
        else
            playerToggler();
    }
});

document.querySelector('.btn-info').addEventListener('click', function() {
    window.alert("GAME INFO:\n\n- The game has 2 players, playing in rounds. \n- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his CURRENT score\n-The player can choose to 'Hold', which means that his CURRENT score gets added to his GLOBAL score. After that, it's the next player's turn\n- The first player to reach 100 points (default) on GLOBAL score wins the game :) \n\n=>RULES : \n\n* If the player rolls a 1 on either dice, all his CURRENT score gets lost. After that, it's the next player's turn. \n* A player looses his ENTIRE score when he rolls two 6's in a row. After that, it's the next player's turn. \n* Player can use the input field to change Winning Score Limit.");
});

document.querySelector('.btn-new').addEventListener('click', init);

function contSix (){
    window.alert("OOPS! You rolled two 6's in a row. You loose you Total Score.");
    roundScore = 0;
    score[activePlayer] = 0;
    document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
    //document.getElementById('current-' + activePlayer).textContent = roundScore;
    playerToggler();
}

function playerToggler (){
    roundScore = 0;
    prevDice[0] = 0;
    prevDice[1] = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function init() {
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    prevDice = [0,0];
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById("inpu").disabled = false;

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}