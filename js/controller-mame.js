'use strict'

var gCanvas
var gCtx

function onInit() {
    gImgs = []
    creatImgs()
    gCanvas = document.querySelector('.canvas-style')
    gCtx = gCanvas.getContext('2d')
    renderMeme()
}

function renderMeme() {
    const img = getMeme()
    drawImgFromlocal(img.url)

}

function drawImgFromlocal(imgSrc = 'img/img1.jpg') {
    var img = new Image()
    img.src = imgSrc
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        drawText('boom', 150, 100)
    }
}

function drawText(text, x, y) {
    const txtStyle = getStyle()
    gCtx.lineWidth = txtStyle.bold
    gCtx.strokeStyle = txtStyle.stoke
    gCtx.fillStyle = txtStyle.fill
    gCtx.font = txtStyle.font
    gCtx.fillText(text, x, y);//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y);//Draws (strokes) a given text at the given (x, y) position.
}

function getStyle() {
    return {
        font: '40px Arial',
        fill: 'black',
        stoke: 'brown',
        bold: 3
    }
}