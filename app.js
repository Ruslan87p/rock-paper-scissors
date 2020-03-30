const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal-content');



const scoreboard = {
    player: 0,
    computer: 0
};

// Play game
 play = (e) => {
     
    restart.style.display = 'inline-block';
    const playerChoice = e.target.id;

    choices.forEach( item => {
        if (playerChoice === item.id) {
            item.classList.remove('element-down');
            item.classList.add('element-up');
            setTimeout( () => {
                item.classList.remove('choosen-element');
                item.classList.add('element-down');
            }, 2000);
        } else {
            item.classList.add('hide-not-selected');
            setTimeout( () => {
                item.classList.remove('hide-not-selected');        
            }, 2500);
          
        }
        
    });

    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
    animateCard();
};

// Get computers choice
 getComputerChoice = () => {
    const rand = Math.random();
    if (rand < 0.34) {
        return 'rock';
    } else if (rand <= 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
};

// Get game winner
 getWinner = (p, c) => {
    if (p === c) {
        return 'draw';
    } else if (p === 'rock') {
        if (c === 'paper') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'paper') {
        if (c === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'scissors') {
        if (c === 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    }
};




 showWinner = (winner, computerChoice) => {

    if (winner === 'player') {
        // Inc player score
        scoreboard.player++;
        // Show modal result
        result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
        <img src="./assets/${computerChoice}.svg" alt="img">
    `;
    } else if (winner === 'computer') {
        // Inc computer score
        scoreboard.computer++;
        // Show modal result
        result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
        <img src="./assets/${computerChoice}.svg" alt="img">
    `;
    } else {
        result.innerHTML = `
      <h1>It's A Draw</h1>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
        <img src="./assets/${computerChoice}.svg" alt="img">
    `;
    }
    // Show score
    score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;
};

// Restart game
 restartGame = () => {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
};


 animateCard = () => {
    modal.style.display = 'flex';
    modal.classList.add('modal-content-open');
    modal.classList.remove('modal-content-close');

    setTimeout(() => {
        modal.classList.remove('modal-content-open');
        modal.classList.add('modal-content-close');
        setTimeout( () => {
            modal.style.display = 'none';
        }, 700);
    }, 2000);
};


// Event listeners

choices.forEach(choice => choice.addEventListener('click', play));
restart.addEventListener('click', restartGame);
