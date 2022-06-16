'use strict'

var gCanvas
var gCtx


function onInit() {
    gImgs = []
    creatImgs()
    // firstRenderMeme()
    renderGallery()
}


function changeHeaterBtn(btnTxt = 'Editor') {
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
    var elGallery = document.querySelector('.main-conteiner')
    elGallery.innerHTML = strHTML.join('')
    changeHeaterBtn('Gallery')
}


function onRandomImg() {

}

// //EDITOR
// <button onclick="onAddLine()">add-line</button>
//         <button onclick="onSwitchLine()">switch-line</button>

/* <label class-"label-color" for="color-line">Color: */
// </label>

function firstRenderMeme() {
    changeHeaterBtn()

    const strHTML = 
`<div class="meme-conteiner">
 <!-- CANVAS -->
    <section class="canvas-container">
        <canvas class="canvas-style" width="500"></canvas>
   </section>
 <!-- EDITOR -->
    <section class="editor-conteiner grid-conteiner-editor">
        <input type="text" name="txt" class="txt-meme" oninput="onDrawText(this.value)">
        <img src="icon/pen.png" class="icon pen" onclick="onAddLine(event)" alt="">
        <img src="icon/color.png" class="icon" name="random-color" alt="">
        <img src="icon/switch.png" class="icon switch" onclick="onSwitchLine(event)" alt="">
        <img src="icon/delete.png" class="icon delete" name="delete-text" alt="">
        
            <input type="color" value="#ffffff" id="color-line" onchange="onChangeColor(this.value)">
        
        <input type="range" id="" value="30" min="20" max="50" onchange="this.title=this.value ,onChangeSize(this.value)">
        <img src="icon/plus.png" class="icon plus" name="plus-font-size" alt="">
        <img src="icon/reduce2.png" class="icon minus" name="minus-font-size" alt="">
        <img src="icon/ltr.png" class="icon" name="ltr" alt="">
        <img src="icon/ltr.png" class="icon" name="rtl" alt="">
        <button class="share">Share</button>
        <div class="font"></div>
        <button class="download">Download</button>
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
    gCanvas.height = (img.height * gCanvas.width) / img.width
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        const memLines = getLineTxt()
        memLines.forEach((line, id) => {
            if (id === 0) {
                changeLineIdx(id)
                drawText(line.txt, 50, 50)
            }
            if (id === 1) {
                changeLineIdx(id)
                drawText(line.txt, 50, 350)
            }
            if (id === 2) {
                changeLineIdx(id)
                drawText(line.txt, 50, 290)
            }
        })

    }
}

function onDrawText(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onImgSelect(idx = getRandomInt(0, gImgs.length), isRandom = false) {
    saveCurImg(idx, isRandom)
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

