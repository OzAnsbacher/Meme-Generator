'use strict'

var gCanvas
var gCtx


function onInit() {
    gImgs = []
    gCanvas = document.querySelector('.canvas-style')
    gCtx = gCanvas.getContext('2d')
    creatImgs()
    // renderMeme()
    renderGallery()
}


// GALLERY
function renderGallery() {
    const imgs = getImgs()
    var strHTML = imgs.map(img =>
        `<img src="${img.url}" class="img-gallery"
         onclick="onImgSelect(${img.id - 1})" alt="img">`)
    // <img src="img/img${2}.jpg" alt="">`
    var elGallery = document.querySelector('.grid-conteiner-gallery')
    elGallery.innerHTML = strHTML.join('')
}

//EDITOR

function renderMeme() {
    const elGallery = document.querySelector('.grid-conteiner-gallery')
    elGallery.classList.add('close-gallery')
    const elEditor = document.querySelector('.grid-conteiner-gallery')
    elEditor.classList.remove('close-editor')
    const img = getMeme()
    drawImgFromlocal(img.url)
}


function drawImgFromlocal(imgSrc = 'img/img1.jpg') {
    var img = new Image()
    img.src = imgSrc
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        drawText(getLineTxt(), 150, 100)
    }
}

function onDrawText(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onImgSelect(idx) {
    saveCurImg(idx)
    renderMeme()
}

function onChangeColor(color) {
    changeColor(color)
    renderMeme()
}

function onChangeSize(size) {
    changeSize(size)
    renderMeme()
}

function onSwitchLine(){
    switchLine()
}

function drawText(text, x, y) {
    gCtx.beginPath()
    const txtStyle = getStyle()
    gCtx.lineWidth = txtStyle.bold
    gCtx.strokeStyle = txtStyle.stoke
    gCtx.fillStyle = txtStyle.fill
    gCtx.font = txtStyle.font
    gCtx.fillText(text, x, y);//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y);//Draws (strokes) a given text at the given (x, y) position.
}

function getStyle() {
    const memeStyle = getStyleServise()
    return {
        font: `${memeStyle.size}px Impact`,
        fill: memeStyle.color,
        stoke: 'black',
        bold: 3
    }
}