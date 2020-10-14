$(document).ready(function() {

    const state = {
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

    const boat = {
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

      $('input[name="leftMissionaries"]').val(state['left'].missionaries);
      $('input[name="leftCanibals"]').val(state['left'].canibals);
      $('input[name="rightMissionaries"]').val(state['right'].missionaries);
      $('input[name="rightCanibals"]').val(state['right'].canibals);

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
      if (state[boatPosition].missionaries === 0) {
        $('#missionarieToBoat').attr('disabled','disabled');
      }
      else {
        $('#missionarieToBoat').removeAttr('disabled');
      }

      if (state[boatPosition]. canibals === 0) {
        $('#canibalToBoat').attr('disabled','disabled');
      }
      else {
        $('#canibalToBoat').removeAttr('disabled');
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
      console.log(missionarieIndex)
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
      console.log(canibalIndex)
      if (canibalIndex !== -1) {
        boat.crew.splice(canibalIndex, 1);
        boat.count--;
        state[boatPosition].canibals++;
        updateState(state);
        updateBoat(boat);
      }
    }


    function moveBoat() {

      console.log('inicio')

      move.defaults = {
        duration: 1500
      }

      if (state.left.boat) {
        move('.barco').x(210).end();
        state.left.boat = false;
        state.right.boat = true;  
      }
      else {
        move('.barco').x(0).end();
        state.right.boat = false;
        state.left.boat = true;
      }
      updateState(state); 
    
    }


  })


