async function updateState(state) {

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
}


function updateBoat(boat) {
    const ship = $('.tripulantes')
    ship.empty();
    for (let i = 0; i < boat.count; i++) {
        ship.append(`<div class="col-sm-1 ${boat.crew[i]}"></div>`)
    }

}

async function nextEvent(currentStateType,currentState, parentStateType,parentState) {

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

    if(currentStateType!=='valid' || parentStateType!=='valid'){
        return
    }

    $('.tripulantes').empty()
    parentState = parentState.replace("(", "");
    parentState = parentState.replace(")", "");
    parentState = parentState.replace("(", "");
    parentState = parentState.replace(")", "");
    let arrayParentState = parentState.split(",");

    state.left.missionaries = parseInt(arrayParentState[0]);
    state.left.canibals = parseInt(arrayParentState[1]);
    state.left.boat = parseInt(arrayParentState[2]);
    state.right.missionaries = parseInt(arrayParentState[3]);
    state.right.canibals = parseInt(arrayParentState[4]);
    state.right.boat = parseInt(arrayParentState[5]);
    updateState(state)

    if(state.right.boat){
        $('.barco').css({transform: 'translateX(210px)'});
    }else{
        $('.barco').css({transform: 'translateX(0px)'});
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(10);
    currentState = currentState.replace("(", "");
    currentState = currentState.replace(")", "");
    currentState = currentState.replace("(", "");
    currentState = currentState.replace(")", "");
    var arrayCurrentState = currentState.split(",");

    diffMissionarie = Math.abs(arrayParentState[0] - arrayCurrentState[0])
    diffCanibal = Math.abs(arrayParentState[1] - arrayCurrentState[1])

    for(let i=0; i<diffMissionarie; i++) {
        addMissionarieToBoat(state,boat);
    }

    for(let i=0; i<diffCanibal; i++) {
        addCanibalToBoat(state,boat);
    }

    await moveBoat(state);

    for(let i=0; i<diffMissionarie; i++) {
        removeMissionarieToBoat(state,boat);
    }

    for(let i=0; i<diffCanibal; i++) {
        removeCanibalToBoat(state,boat);
    }

}

function getBoatPosition(state) {
    if (state.right.boat) return 'right'
    else                  return 'left'
}

function addMissionarieToBoat(state,boat) {
    const ship = $('.tripulantes')
    const boatPosition = getBoatPosition(state)
    if (state[boatPosition].missionaries !== 0 && boat.count < 2) {
        ship.append('<div class="col-sm-1 missionario"></div>')
        boat.crew.push('missionario')
        boat.count++
        console.log("antes do add ", boatPosition, state[boatPosition].missionaries)
        state[boatPosition].missionaries--;
        console.log("depois de add ", boatPosition, state[boatPosition].missionaries)
        updateState(state)
        updateBoat(boat)
    }
}

function addCanibalToBoat(state,boat) {
    const ship = $('.tripulantes')
    const boatPosition = getBoatPosition(state)
    if (state[boatPosition].canibals !== 0 && boat.count < 2) {
        ship.append('<div class="col-sm-1 canibal"></div>')
        boat.crew.push('canibal')
        boat.count++
        state[boatPosition].canibals--;
        updateState(state)
        updateBoat(boat)
    }
}

function removeMissionarieToBoat(state,boat) {
    const boatPosition = getBoatPosition(state)
    const missionarieIndex = boat.crew.findIndex(ind => ind === 'missionario');
    if (missionarieIndex !== -1) {
        boat.crew.splice(missionarieIndex, 1);
        boat.count--;
        state[boatPosition].missionaries++;
        updateState(state);
        updateBoat(boat);
    }
}

function removeCanibalToBoat(state,boat) {
    const boatPosition = getBoatPosition(state)
    const canibalIndex = boat.crew.findIndex(ind => ind === 'canibal');
    console.log(canibalIndex)
    if (canibalIndex !== -1) {
        boat.crew.splice(canibalIndex, 1);
        boat.count--;
        state[boatPosition].canibals++;
        updateState(state);
        updateBoat(boat);
    }
}


async function moveBoat(state,duration=500) {

    console.log('inicio')

    move.defaults = {
        duration: duration
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
    updateState(state); 
    
}


// $('#missionarieToBoat').on('click', addMissionarieToBoat)
// $('#canibalToBoat').on('click', addCanibalToBoat)    

// $('#missionarieFromBoat').on('click', removeMissionarieToBoat)
// $('#canibalFromBoat').on('click', removeCanibalToBoat)   

// $('#boat').on('click', moveBoat)

// $('#previous').on('click', previousEvent)
// $('#next').on('click', nextEvent)
