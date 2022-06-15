'use strict'

var gCanvas
var gCtx


function onInit() {
    gImgs = []
    // gCanvas = document.querySelector('.canvas-style')
    // gCtx = gCanvas.getContext('2d')
    creatImgs()
    // renderMeme()
    renderGallery()
}


function changeHeaterBtn(btnTxt='Editor') {
    let elbtn = document.querySelectorAll('button.btn-header')
    elbtn.forEach(btn => {
        btn.classList.remove('btn-push')
        if (btn.innerText === btnTxt) btn.classList.add('btn-push')
    })
}


// GALLERY
function renderGallery() {
    const imgs = getImgs()
    var strHTML = imgs.map(img =>
        `<img src="${img.url}" class="img-gallery"
         onclick="onImgSelect(${img.id - 1})" alt="img">`)

    strHTML.unshift(`<div class="gallery-conteiner" >
         <input type="text" name="" class="search-key" id="" placeholder="Search"></input>
         <section class="grid-conteiner-gallery">`)
    strHTML.push(`</section></div>`)
    console.log(strHTML);
    var elGallery = document.querySelector('.main-conteiner')
    elGallery.innerHTML = strHTML.join('')
    changeHeaterBtn('Gallery')
}



//EDITOR

function firstRenderMeme() {
    changeHeaterBtn()

    const strHTML = ` <div class="meme-conteiner">
    <!-- CANVAS -->
    <section class="canvas-container">
        <canvas class="canvas-style" height="500" width="500"></canvas>
    </section>
    <!-- EDITOR -->
    <section class="editor-conteiner">
        <input type="text" name="" id="" oninput="onDrawText(this.value)">
        <label for="color-line">Color:
            <input type="color" value="#ffffff" id="color-line" onchange="onChangeColor(this.value)">
        </label>
        <input type="range" id="" value="30" min="10" max="50"
            onchange="this.title=this.value ,onChangeSize(this.value)">
        <button class="" onclick="onAddLine()">add-line</button>
        <button class="" onclick="onSwitchLine()">switch-line</button>
    </section>
</div>`

    var elGallery = document.querySelector('.main-conteiner')
    elGallery.innerHTML = strHTML
    gCanvas = document.querySelector('.canvas-style')
    gCtx = gCanvas.getContext('2d')

    const img = getMeme()
    drawImgFromlocal(img.url)
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
        const memLines = getLineTxt()
        console.log(memLines);
        memLines.forEach((line, id) => {
            if (id === 0) drawText(line.txt, 50, 100)
            if (id === 1) drawText(line.txt, 50, 400)
            if (id === 2) drawText(line.txt, 50, 250)
        })

    }
}

function onDrawText(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onImgSelect(idx) {
    saveCurImg(idx)
    console.log(1111);
    firstRenderMeme()
}

function onChangeColor(color) {
    changeColor(color)
    renderMeme()
}

function onChangeSize(size) {
    changeSize(size)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
}

function onAddLine() {
    const msg = addLine()
    if (msg) {
        console.log(msg)
        return
    }
    renderMeme()
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