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

    updateState();

    // async function showLoserMsg() {
      
    //   let loserState = undefined
    //   if (state['left'].canibals > state['left'].missionaries && getBoatPosition() === 'right')
    //     loserState = `Lado esquerdo = (${state['left'].missionaries}, ${state['left'].canibals}, 0)`
    //   else
    //     loserState = `Lado direito = (${state['right'].missionaries}, ${state['right'].canibals}, 0)`

    //   $('.finalMessage').html(`Você perdeu!<br>Motivo: ${loserState}`)
      
    //   await new Promise(r => setTimeout(r, 5000));

    //   $('.finalMessage').empty()
    // }

    // async function showWinnerMsg() {
    //   $('.finalMessage').html(`Parabéns, você ganhou!<br>Motivo: (${state['right'].missionaries}, ${state['right'].canibals}, 0)`);
      
    //   await new Promise(r => setTimeout(r, 5000));

    //   $('.finalMessage').empty()

    // }

    // function resetState() {

    //   state = {
    //     left: {
    //       missionaries: 3,
    //       canibals: 3,
    //       boat: true,
    //     },
    //     right: {
    //       missionaries: 0,
    //       canibals: 0,
    //       boat: false
    //     }
    //   }
  
    //   const boat = {
    //     crew: [],
    //     count: 0,
    //   };

    //   updateState();
    //   updateBoat();
    //   updateButtonsState()
    //   move('.barco').x(0).end();
    // }

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

      // let missionariesInBoat = 0
      // let canibalsInBoat = 0
      // for (let i = 0; i < boat.crew.length; i++) {
      //   boat.crew[i] === 'missionario' ? missionariesInBoat++ : canibalsInBoat++
      // }

      // if ((state['left'].canibals > state['left'].missionaries && getBoatPosition() === 'right') || (state['right'].canibals > state['right'].missionaries && getBoatPosition() === 'left')) {
      //   showLoserMsg();
      //   await new Promise(r => setTimeout(r, 5000));
      //   resetState();
      // }

      // if (state['right'].canibals === 3 && state['right'].misisonaries === 3) {
      //   showWinnerMsg();
      //   await new Promise(r => setTimeout(r, 5000));
      //   resetState();
      // }

      // console.log(state)

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
      console.log(missionarieIndex)
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
      updateState(); 
    
    }


  })


