let buttonStart = document.querySelector('.button--main')
let buttonRestart = document.querySelector('.button--restart')
let announcer = document.querySelector('.announcer')
let weaponIndex = 1;
let computerWeapon = document.querySelector('.computer-hand')

// Changes the weapon display
function changeWeapon(n) {
    let weapons = document.querySelectorAll('.weapon')

    if (n > weapons.length) {
        weaponIndex = 1
    }
    if (n < 1) {
        weaponIndex = weapons.length
    }
    for (let i = 0; i < weapons.length; i++) {
        weapons[i].style.display = "none"
    }
    weapons[weaponIndex - 1].style.display = "block"
}

// Changes the value of weaponIndex
function addWeapon(n) {
    changeWeapon(weaponIndex += n)
}

//  Generates a random number for the computer's weapon
function computerPlay() {
    let elements = ["rock", "paper", "scissors"]
    let computerChoice = elements[Math.floor(Math.random() * elements.length)]
    return computerChoice
}

// Function that takes the player and computer's weapon 
// which then generates information about the round
function playRound(playerSelection, computerSelection) {
    if (playerSelection === 1) {
        if (computerSelection === 'rock') {
            announcer.style.opacity = 0
            setTimeout(function () {
                announcer.style.opacity = 1;
                announcer.innerHTML = `It's a tie!`
                computerWeapon.classList.remove('fa-hand-paper')
                computerWeapon.classList.remove('fa-hand-scissors')
                computerWeapon.classList.add('fa-fist-raised')
            }, 400)
        } else if (computerSelection === 'paper') {
            announcer.style.opacity = 0
            setTimeout(function () {
                announcer.style.opacity = 1
                announcer.innerHTML = `You lost! :(`
                computerWeapon.classList.remove('fa-fist-raised')
                computerWeapon.classList.remove('fa-hand-scissors')
                computerWeapon.classList.add('fa-hand-paper')
            }, 400)
        } else {
            announcer.style.opacity = 0
            setTimeout(function () {
                announcer.style.opacity = 1
                announcer.innerHTML = `You won! :)`
                computerWeapon.classList.remove('fa-hand-paper')
                computerWeapon.classList.remove('fa-fist-raised')
                computerWeapon.classList.add('fa-hand-scissors')
            }, 400)
        }
    } else if (playerSelection === 2) {
        if (computerSelection === 'rock') {
            announcer.style.opacity = 0
            setTimeout(function () {
                announcer.style.opacity = 1;
                announcer.innerHTML = `You won! :)`
                computerWeapon.classList.remove('fa-hand-paper')
                computerWeapon.classList.remove('fa-hand-scissors')
                computerWeapon.classList.add('fa-fist-raised')
            }, 400)
        } else if (computerSelection === 'paper') {
            announcer.style.opacity = 0;
            setTimeout(function () {
                announcer.style.opacity = 1;
                announcer.innerHTML = `It's a tie!`
                computerWeapon.classList.remove('fa-fist-raised')
                computerWeapon.classList.remove('fa-hand-scissors')
                computerWeapon.classList.add('fa-hand-paper')
            }, 400)
        } else {
            announcer.style.opacity = 0;
            setTimeout(function () {
                announcer.style.opacity = 1;
                announcer.innerHTML = `You lost! :(`
                computerWeapon.classList.remove('fa-hand-paper')
                computerWeapon.classList.remove('fa-fist-raised')
                computerWeapon.classList.add('fa-hand-scissors')
            }, 400)
        }
    } else {
        if (computerSelection === 'rock') {
            announcer.style.opacity = 0;
            setTimeout(function () {
                announcer.style.opacity = 1;
                announcer.innerHTML = `You lost! :(`
                computerWeapon.classList.remove('fa-hand-paper')
                computerWeapon.classList.remove('fa-hand-scissors')
                computerWeapon.classList.add('fa-fist-raised')
            }, 400)
        } else if (computerSelection === 'paper') {
            announcer.style.opacity = 0;
            setTimeout(function () {
                announcer.style.opacity = 1;
                announcer.innerHTML = `You won! :)`
                computerWeapon.classList.remove('fa-fist-raised')
                computerWeapon.classList.remove('fa-hand-scissors')
                computerWeapon.classList.add('fa-hand-paper')
            }, 400)
        } else {
            announcer.style.opacity = 0;
            setTimeout(function () {
                announcer.style.opacity = 1;
                announcer.innerHTML = `It's a tie!`
                computerWeapon.classList.remove('fa-hand-paper')
                computerWeapon.classList.remove('fa-fist-raised')
                computerWeapon.classList.add('fa-hand-scissors')
            }, 400)
        }
    }
}


// Starts the game 
let computerLife = 5;
let humanLife = 5;

function game() {
    let life = document.querySelectorAll('.life')
    let computerChoice = computerPlay()
    let playerChoice = weaponIndex
    if (playerChoice === 1) {
        if (computerChoice === 'paper') {
            humanLife -= 1
        } else if (computerChoice === 'scissors') {
            computerLife -= 1
        }
    } else if (playerChoice === 2) {
        if (computerChoice === 'rock') {
            computerLife -= 1
        } else if (computerChoice === 'scissors') {
            humanLife -= 1
        }
    } else {
        if (computerChoice === 'rock') {
            humanLife -= 1
        } else if (computerChoice === 'paper') {
            computerLife -= 1
        }
    }

    life[0].innerHTML = humanLife
    life[1].innerHTML = computerLife
    playRound(playerChoice, computerChoice)

    let endGame = document.querySelector('.end-screen')
    let endTitle = document.querySelector('.end-title')
    let endDescription = document.querySelector('.end-description')
    if (computerLife === 0) {
        endGame.style.display = "block"
        setTimeout(function () {
            endGame.style.opacity = "1"
        }, 300)
        buttonStart.style.pointerEvents = "none";
    } else if (humanLife === 0) {
        endGame.style.display = "block"
        setTimeout(function () {
            endGame.style.opacity = "1"
        }, 300)
        endTitle.innerHTML = `You lost!`
        endDescription.innerHTML = `I guess they are the true gigachads. Better luck next time!`
        buttonStart.style.pointerEvents = "none";
    }
}

buttonStart.addEventListener('click', game)
buttonRestart.addEventListener('click', function () {
    window.location.reload();
})