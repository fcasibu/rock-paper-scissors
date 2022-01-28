// Index starts at rock
let weaponIndex = 1;
let playerWeapon = document.querySelector('.player-weapon')
let computerWeapon = document.querySelector('.computer-weapon')
let weaponObj = {
    1: "fa-fist-raised", // rock
    2: "fa-hand-paper", // paper
    3: "fa-hand-scissors" // scissors
}

// Changes the players weapon icon
function changePlayerWeapon(weaponIndex) {
    playerWeapon.classList.remove('fa-hand-paper')
    playerWeapon.classList.remove('fa-hand-scissors')
    playerWeapon.classList.add(weaponObj[weaponIndex])
}

// Changes the computer's weapon icon
function changeCpuWeapon(computerSelection) {
    computerWeapon.classList.remove('fa-hand-paper')
    computerWeapon.classList.remove('fa-hand-scissors')
    computerWeapon.classList.add(weaponObj[computerSelection])
}

// Changes what weapon to display
function changeWeapon(n) {
    let weapons = document.querySelectorAll('.weapon')

    // Prevents the selection from going less than rock and more than scissors
    if (n < 1) {
        weaponIndex = weapons.length
    }
    if (n > weapons.length) {
        weaponIndex = 1
    }
    // Makes every weapon disappear
    for (let i = 0; i < weapons.length; i++) {
        weapons[i].style.display = "none"
        weapons[i].style.transform = "scale(0)"
        weapons[i].style.opacity = 0
    }
    // Makes the current weapon to show up
    weapons[weaponIndex - 1].style.display = "block"
    setTimeout(function () {
        weapons[weaponIndex - 1].style.opacity = 1
        weapons[weaponIndex - 1].style.transform = "scale(1.2)"
    }, 50)
    changePlayerWeapon(weaponIndex)
}

// Changes the value of weaponIndex (current weapon)
function addWeapon(n) {
    changeWeapon(weaponIndex += n)
}

//  Generates a random number for the computer's weapon
function computerPlay() {
    let elements = [1, 2, 3] // 1 = rock, 2 = paper, 3 = scissors
    return elements[Math.floor(Math.random() * elements.length)];
}

// Styles the announcer text
let announcer = document.querySelector('.announcer')

function announcerAnim() {
    announcer.style.visibility = "hidden"
    announcer.style.transform = "scale(0.2)"
    setTimeout(function () {
        announcer.style.visibility = "visible"
        announcer.style.transform = "scale(1.1)"
    }, 200)
}

// Function that takes the player and computer's weapon
// which then generates information about the round
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        announcer.innerHTML = `It's a tie!`
        announcerAnim()
        changeCpuWeapon(computerSelection)
    } else if (playerSelection === 1 && computerSelection === 2 ||
        playerSelection === 2 && computerSelection === 3 ||
        playerSelection === 3 && computerSelection === 1) {
        announcer.innerHTML = `You lost! :(`
        announcerAnim()
        changeCpuWeapon(computerSelection)
    } else {
        announcer.innerHTML = `You won! :)`
        announcerAnim()
        changeCpuWeapon(computerSelection)
    }
}

let playerHealth = 100;
let computerHealth = 100;
let life = document.querySelectorAll('.life')
// Changes the healthbar color
function updateLifeColor() {
    if (life[0].style.width === "60%") {
        life[0].style.backgroundColor = "yellow"
    } else if (life[0].style.width === "20%") {
        life[0].style.backgroundColor = "red"
    }
    life[1].style.width = computerHealth + '%'
    if (life[1].style.width === "60%") {
        life[1].style.backgroundColor = "yellow"
    } else if (life[1].style.width === "20%") {
        life[1].style.backgroundColor = "red"
    }
}

// Shows the endgame screen
let endScreen = document.querySelector('.end-screen')
let endScreenTitle = document.querySelector('.end-title')
let endScreenDescription = document.querySelector('.end-description')

function endScreenAnim() {
    endScreen.style.display = "block"
    setTimeout(function () {
        endScreen.style.opacity = 1
    }, 300)
    buttonStart.style.pointerEvents = "none"
}

function showEndScreen() {
    if (playerHealth === 0) {
        endScreenTitle.innerHTML = "You lost!"
        endScreenDescription.innerHTML = "I guess they are the true gigachads. Go Again!"
        endScreenAnim()
    } else if (computerHealth === 0) {
        endScreenAnim()
    }
}
let fighterImage = document.querySelectorAll('img')

// Starts the game
function game() {
    let computerChoice = computerPlay()
    let playerChoice = weaponIndex
    if (playerChoice === computerChoice) {

    } else if (playerChoice === 1 && computerChoice === 2 ||
        playerChoice === 2 && computerChoice === 3 ||
        playerChoice === 3 && computerChoice === 1) {
        playerHealth -= 20;
        fighterImage[0].classList.add('damaged');
        setTimeout(() => {
            fighterImage[0].classList.toggle('damaged');
        }, 300);
    } else {
        computerHealth -= 20
        fighterImage[1].classList.add('damaged')
        setTimeout(() => {
            fighterImage[1].classList.toggle('damaged');
        }, 300);
    }
    life[0].style.width = playerHealth + '%'
    life[1].style.width = computerHealth + '%'
    playRound(playerChoice, computerChoice)
    updateLifeColor()
    showEndScreen()

}

let buttonStart = document.querySelector('.button--main')
let buttonRestart = document.querySelector('.button--restart')
buttonStart.addEventListener('click', game)
buttonRestart.addEventListener('click', () => window.location.reload())