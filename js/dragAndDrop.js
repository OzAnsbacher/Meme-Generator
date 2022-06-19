var gLine
// var gCanvas
// var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

// function onInit() {
// gCanvas = document.querySelector('canvas')
// gCtx = gCanvas.getContext('2d')

// resizeCanvas()
//Calc the center of the canvas
// const center = { x: gCanvas.width / 2, y: gCanvas.height / 2 }
//Create the circle in the center
// createCircle(center)

// renderCanvas()
// }

// function renderCanvas() {
//Set the backgournd color to grey 
// gCtx.fillStyle = "#ede5ff"
// //Clear the canvas,  fill it with grey background
// gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
// renderCircle()
// }

function renderCircle() {
    //Get the props we need from the circle 
    const { pos, color, size } = getLine()
    //Draw the circle
    drawArc(pos.x, pos.y, size, color)
}

//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log(pos);
    const idx = idxLineClicked(pos)
    console.log(idx);
    if (idx === -1) return
    getLineMove(idx)
    // Save the pos we start from 
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const line = getLine();
    if (gLine) {
        const pos = getEvPos(ev)
        //Calc the delta , the diff we moved
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveCircle(dx, dy)
        //Save the last pos , we remember where we`ve been and move accordingly
        gStartPos = pos
        //The canvas is render again after every move
        renderMeme()
    }
}

function onUp() {
    gLine=''
    // getLineMove(false)
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {

    //Gets the offset pos , the default pos
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (gTouchEvs.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

// function drawArc(x, y, size = 60, color = 'blue') {
//     gCtx.beginPath()
//     gCtx.lineWidth = '6'
//     gCtx.arc(x, y, size, 0, 2 * Math.PI)
//     gCtx.strokeStyle = 'white'
//     gCtx.stroke()
//     gCtx.fillStyle = color
//     gCtx.fill()
// }


// function createCircle(pos) {
//     gCircle = {
//         pos,
//         size: 60,
//         color: 'blue',
//         isDrag: false
//     }
// }

function getLine() {
    return gLine
}

//Check if the click is inside the circle 
function idxLineClicked(clickedPos) {
    const lines = gMeme.line
    // Calc the distance between two dots
    const idx = lines.findIndex((line) =>
        Math.sqrt(line.pos.y - clickedPos.y) < 40
    )
    // const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    //If its smaller then the radius of the circle we are inside
    return idx
}


function getLineMove(idx) {
    gLine= gMeme.line[idx]
}

//Move the circle in a delta, diff from the pervious pos
function moveCircle(dx, dy) {
    gLine.pos.x += dx
    gLine.pos.y += dy

}

