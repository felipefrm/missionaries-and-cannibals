$(document).ready(function() {

    let state = {
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

    let boat = {
      crew: [],
      count: 0,
    };

    updateState(state);

    function updateState(state) {

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

      checkState(state)

      updateButtonsState(state)
    }

    function updateBoat(boat) {
      const ship = $('.tripulantes')
      ship.empty();
      for (let i = 0; i < boat.count; i++) {
          ship.append(`<div class="col-sm-1 ${boat.crew[i]}"></div>`)
      }

    }

    function updateButtonsState(state) {
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

    $('#missionarieToBoat').on('click', addMissionarieToBoat)
    $('#canibalToBoat').on('click', addCanibalToBoat)    
 
    $('#missionarieFromBoat').on('click', removeMissionarieToBoat)
    $('#canibalFromBoat').on('click', removeCanibalToBoat)   

    $('#boat').on('click', moveBoat)


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
        state[boatPosition].missionaries--;
        updateState(state)
        updateBoat(boat)
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
        updateState(state)
        updateBoat(boat)
      }
    }

    function removeMissionarieToBoat() {
      const boatPosition = getBoatPosition()
      const missionarieIndex = boat.crew.findIndex(ind => ind === 'missionario');
      if (missionarieIndex !== -1) {
        boat.crew.splice(missionarieIndex, 1);
        boat.count--;
        state[boatPosition].missionaries++;
        updateState(state);
        updateBoat(boat);
      }
    }

    function removeCanibalToBoat() {
      const boatPosition = getBoatPosition()
      const canibalIndex = boat.crew.findIndex(ind => ind === 'canibal');
      if (canibalIndex !== -1) {
        boat.crew.splice(canibalIndex, 1);
        boat.count--;
        state[boatPosition].canibals++;
        updateState(state);
        updateBoat(boat);
      }
    }


    function moveBoat() {

      move.defaults = {
        duration: 1500
      }

      if (state.left.boat) {
        move('.barco').x(210).end();
        state.left.boat = false;
        state.right.boat = true;  
        // state.right.canibals += canibalCount
        // state.right.missionaries += missionarieCount
      }
      else {
        move('.barco').x(0).end();
        state.right.boat = false;
        state.left.boat = true;
        // state.left.canibals += canibalCount
        // state.left.missionaries += missionarieCount
      }
      updateState(state); 
    
    }

    function resetState() {
      
      state = {
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

      boat = {
        crew: [],
        count: 0,
      };

      updateState(state)
      updateBoat(boat)

    }

    async function checkState(state) {

      let canibalCount = 0, missionarieCount = 0;

      for (let i=0; i<boat.crew.length; i++) {
        if (boat.crew[i] == 'canibal')
          canibalCount++;
        else
          missionarieCount++;
      }

      let boatLeft = 0, boatRight = 0;

      if (getBoatPosition() === 'left') {
        boatLeft = 1
      }
      else
        boatRight = 1

      const finalMessage = $('#finalMessage');

      
      if ((state['right'].missionaries !== 0 && state['right'].missionaries < state['right'].canibals && state['right'].boat === false)  || (state['left'].missionaries !== 0 && state['left'].missionaries < state['left'].canibals  && state['left'].boat === false)) {
        
        finalMessage.html(`Você perdeu!`)
        await new Promise(r => setTimeout(r, 4000));
        finalMessage.empty()
       
        move.defaults = {
          duration: 1500
        }
  
        move('.barco').x(0).end();
        resetState(state, boat)
      }

      else if ((state['right'].missionaries + missionarieCount !== 0 && state['right'].missionaries + missionarieCount < state['right'].canibals + canibalCount && state['right'].boat === true)  || (state['left'].missionaries + missionarieCount !== 0 && state['left'].missionaries + missionarieCount < state['left'].canibals + canibalCount && state['left'].boat === true)) {
        
        finalMessage.html(`Você perdeu!`)
        await new Promise(r => setTimeout(r, 4000));
        finalMessage.empty()

        move.defaults = {
          duration: 1500
        }
  
        move('.barco').x(0).end();
        resetState(state, boat)
      }

      else if ((state['right'].missionaries + state['right'].canibals) === 6) {
        
        finalMessage.html('Parabéns, você ganhou!')
        await new Promise(r => setTimeout(r, 4000));
        finalMessage.empty()
        
        move.defaults = {
          duration: 1500
        }
  
        move('.barco').x(0).end();
        resetState(state, boat)
      }
    }
  })


