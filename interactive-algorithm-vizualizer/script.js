
var state = {
    left: {
        missionaries: 3,
        canibals: 3,
        boat: true,
    },
    right: {
        missionaries: 0,
        canibals: 0,
        boat: false
    }
}

var boat = {
    crew: [],
    count: 0,
};

async function updateState() {

    const left = $('.margem-esquerda .row')
    left.empty()
    for (let i=0; i<state['left'].missionaries; i++) {
        left.append('<div class="col-sm-1 missionario"></div>')
    }
    for (let i=0; i<state['left'].canibals; i++) {
        left.append('<div class="col-sm-1 canibal"></div>')
    }

    const right = $('.margem-direita .row')
    right.empty()
    for (let i=0; i<state['right'].missionaries; i++) {
        right.append('<div class="col-sm-1 missionario"></div>')
    }
    for (let i=0; i<state['right'].canibals; i++) {
        right.append('<div class="col-sm-1 canibal"></div>')
    }

    $('input[name="leftMissionaries"]').val(state['left'].missionaries);
    $('input[name="leftCanibals"]').val(state['left'].canibals);
    $('input[name="rightMissionaries"]').val(state['right'].missionaries);
    $('input[name="rightCanibals"]').val(state['right'].canibals);

    updateButtonsState()
}


function updateBoat() {
    const ship = $('.tripulantes')
    ship.empty();
    for (let i = 0; i < boat.count; i++) {
        ship.append(`<div class="col-sm-1 ${boat.crew[i]}"></div>`)
    }

}

function updateButtonsState() {
    const boatPosition = getBoatPosition()
    if (state[boatPosition].missionaries === 0 || boat.count === 2) {
        $('#missionarieToBoat').attr('disabled','disabled');
    }
    else {
        $('#missionarieToBoat').removeAttr('disabled');
    }

    if (state[boatPosition]. canibals === 0  || boat.count === 2) {
        $('#canibalToBoat').attr('disabled','disabled');
    }
    else {
        $('#canibalToBoat').removeAttr('disabled');
    }

    if (boat.crew[0] !== 'missionario' && boat.crew[1] !== 'missionario') {
        $('#missionarieFromBoat').attr('disabled', 'disabled');
    }
    else {
        $('#missionarieFromBoat').removeAttr('disabled');
    }

    if (boat.crew[0] !== 'canibal' && boat.crew[1] !== 'canibal') {
        $('#canibalFromBoat').attr('disabled', 'disabled');
    }
    else {
        $('#canibalFromBoat').removeAttr('disabled');
    }

    if (boat.count === 0) {
        $('#boat').attr('disabled','disabled');
    }
    else {
        $('#boat').removeAttr('disabled');
    }
}

async function previousEvent() {

}

async function nextEvent(currentStateType,currentState, parentStateType,parentState) {

    if(currentStateType!=='Valid' || parentStateType!=='Valid')
        console.log("invalid state")
        return
    parentState = parentState.replace("(", "");
    parentState = parentState.replace(")", "");
    let arrayParentState = parentState.split(",");

    state.left.missionaries = parseInt(arrayParentState[1]);
    state.left.canibals = parseInt(arrayParentState[2]);
    state.left.boat = parseInt(arrayParentState[3]);
    state.right.missionaries = parseInt(arrayParentState[4]);
    state.right.canibals = parseInt(arrayParentState[5]);
    state.right.boat = parseInt(arrayParentState[6]);

    updateState()
    
    currentState = currentState.replace("(", "");
    currentState = currentState.replace(")", "");
    var arrayCurrentState = currentState.split(",");

    if (arrayCurrentState[1] < 0 || arrayCurrentState[2] < 0 || arrayCurrentState[4] < 0 || arrayCurrentState[5] < 0) {
        console.log('invalido');
    }

    diffMissionarie = Math.abs(arrayParentState[1] - arrayCurrentState[1])
    diffCanibal = Math.abs(arrayParentState[2] - arrayCurrentState[2])

    for(let i=0; i<diffMissionarie; i++) {
      addMissionarieToBoat();
    }

    for(let i=0; i<diffCanibal; i++) {
      addCanibalToBoat();
    }

    await moveBoat();

    for(let i=0; i<diffMissionarie; i++) {
      removeMissionarieToBoat();
    }

    for(let i=0; i<diffCanibal; i++) {
      removeCanibalToBoat();
    }

}

function getBoatPosition() {
    if (state.right.boat) return 'right'
    else                  return 'left'
}

function addMissionarieToBoat() {
    const ship = $('.tripulantes')
    const boatPosition = getBoatPosition()
    if (state[boatPosition].missionaries !== 0 && boat.count < 2) {
        ship.append('<div class="col-sm-1 missionario"></div>')
        boat.crew.push('missionario')
        boat.count++
        console.log("antes do add ", boatPosition, state[boatPosition].missionaries)
        state[boatPosition].missionaries--;
        console.log("depois de add ", boatPosition, state[boatPosition].missionaries)
        updateState()
        updateBoat()
    }
}

function addCanibalToBoat() {
    const ship = $('.tripulantes')
    const boatPosition = getBoatPosition()
    if (state[boatPosition].canibals !== 0 && boat.count < 2) {
        ship.append('<div class="col-sm-1 canibal"></div>')
        boat.crew.push('canibal')
        boat.count++
        state[boatPosition].canibals--;
        updateState()
        updateBoat()
    }
}

function removeMissionarieToBoat() {
    const boatPosition = getBoatPosition()
    const missionarieIndex = boat.crew.findIndex(ind => ind === 'missionario');
    if (missionarieIndex !== -1) {
        boat.crew.splice(missionarieIndex, 1);
        boat.count--;
        state[boatPosition].missionaries++;
        updateState();
        updateBoat();
    }
}

function removeCanibalToBoat() {
    const boatPosition = getBoatPosition()
    const canibalIndex = boat.crew.findIndex(ind => ind === 'canibal');
    console.log(canibalIndex)
    if (canibalIndex !== -1) {
        boat.crew.splice(canibalIndex, 1);
        boat.count--;
        state[boatPosition].canibals++;
        updateState();
        updateBoat();
    }
}


async function moveBoat() {

    console.log('inicio')

    move.defaults = {
        duration: 1500
    }

    if (state.left.boat) {
        await move('.barco').x(210).end();
        state.left.boat = false;
        state.right.boat = true;  
    }
    else {
        await move('.barco').x(0).end();
        state.right.boat = false;
        state.left.boat = true;
    }
    updateState(); 
    
}


updateState();

$('#missionarieToBoat').on('click', addMissionarieToBoat)
$('#canibalToBoat').on('click', addCanibalToBoat)    

$('#missionarieFromBoat').on('click', removeMissionarieToBoat)
$('#canibalFromBoat').on('click', removeCanibalToBoat)   

$('#boat').on('click', moveBoat)

$('#previous').on('click', previousEvent)
$('#next').on('click', nextEvent)
