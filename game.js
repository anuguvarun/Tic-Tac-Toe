const game = (function () {

  const cellElements = [
    document.getElementById('upper-left'),
    document.getElementById('upper-mid'),
    document.getElementById('upper-right'),
    document.getElementById('center-left'),
    document.getElementById('center-mid'),
    document.getElementById('center-right'),
    document.getElementById('lower-left'),
    document.getElementById('lower-mid'),
    document.getElementById('lower-right')
  ];

  let data = []
  data[8] = undefined
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].addEventListener('click', eventhandler)
  }

  async function eventhandler() {
    // add player's X
    const isValidMove = await addX(event.target);
    data[cellElements.indexOf(event.target)] = 'X'
    let winner = getWinner()
    if(winner){
      alert(`${ winner === 'X' ? 'You' : 'System '} won`)
      stopGame()
      if(confirm('Play Again')){
        location.reload()
      }else{
        return;
      }
    }
    if (isValidMove) {

      // choose computer's O
      const j = await findBestMove(cellElements);
      data[j] = 'O'
      // pause, then add computer's O
      await new Promise((resolve) => setTimeout(() => resolve(), 500));
      await addO(cellElements[j]);
      winner = getWinner()
      if(winner){
        alert(`${ winner === 'X' ? 'You' : 'System '} won`)
        stopGame()
      }
    }

  }

  function stopGame(){
    for(cell of cellElements){
      cell.removeEventListener('click', eventhandler)
    }
  }

  async function findBestMove(arr) {
    for (let n = 0; n < arr.length; n++) {
      if (arr[n].childElementCount === 0) {
        return n;
      }
    }
  }

  async function addX(cellElement) {
    if (cellElement.childElementCount === 1) { return false; }
    const headingElement = document.createElement("h1");
    const textNode = document.createTextNode("X");
    headingElement.appendChild(textNode);
    cellElement.appendChild(headingElement);
    return true;
  }

  async function addO(cellElement) {
    if (cellElement.childElementCount === 1) { return; }
    const headingElement = document.createElement("h1");
    const textNode = document.createTextNode("O");
    headingElement.appendChild(textNode);
    cellElement.appendChild(headingElement);
  }
  function getWinner() {
    let data2d = [
                  [ data[0], data[1], data[2] ],
                  [ data[3], data[4], data[5] ],
                  [ data[6], data[7], data[8] ]
                ]
    for(eachrow of data2d){
      let count = 0
      let prevele = null
        for(eachcol of eachrow){
          if(prevele === eachcol){
            count += 1  
          }
          prevele = eachcol
        }
        if(count === 2){
          return eachrow[0]
        }
    }

    for(let col = 0; col < 3; col++){
      let count = 0
      let prevele = null
      for(let row = 0; row < 3; row++){
        if(prevele === data2d[row][col]){
          count += 1  
        }
        prevele = data2d[row][col]
      }
      if(count === 2){
        return data2d[0][col]
      }
    }

    return false
  }

})();