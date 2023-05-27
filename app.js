document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const flagsLeft = document.querySelector('#flags-left')
  const result = document.querySelector('#result')
  let width = 0
  let bombAmount = 0
  let flags = 0
  let squares = []
  let isGameOver = false
  let checkingExtra1 = true
  let checkingExtra2
  let timesExtra2 = 3
  let flagArr = []
  let stackUndo = []
  let stackRedo  = []
  

  //create Board
  function createBoard() {

    flagsLeft.innerHTML = bombAmount

    //get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width * width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)
    console.log(shuffledArray)
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      square.classList.add(shuffledArray[i])
      grid.appendChild(square)
      squares.push(square)

      //normal click
      square.addEventListener('click', function (e) {
        if(checkingExtra2 == true ){
          clickExtra2(square)
          checkingExtra2 = false
        }else{
          click(square)
        }
          
      })

      //ctrl and left click
      square.oncontextmenu = function (e) {
        e.preventDefault()
        addFlag(square)
      }
    }

    //add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0
      const isLeftEdge = (i % width === 0)
      const isRightEdge = (i % width === width - 1)

   
      // add number for all level include easy,hard,medium:
      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++
        if (i > (width-1) && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
        if (i > width && squares[i - width].classList.contains('bomb')) total++
        if (i > (width+1) && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++
        if (i < (width*width-2) && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++
        if (i < (width*width-width) && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++
        if (i < (width*width-width-2) && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++
        if (i < (width*width-width-1) && squares[i + width].classList.contains('bomb')) total++
        squares[i].setAttribute('data', total)
      }
    }
  }
  createBoard()
})