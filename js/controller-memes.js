'use strict'


var gCanvas
var gCtx


function onInit() {
    gImgs = []
    gImgsSave = []
    creatImgs()
    gFont = 'Impact'
    // firstRenderMeme()
    renderGallery()
}


function changeHeaderBtn(btnTxt = 'Editor') {
    let elbtn = document.querySelectorAll('button.btn-header')
    elbtn.forEach(btn => {
        btn.classList.remove('btn-push')
        if (btn.innerText === btnTxt) btn.classList.add('btn-push')
    })
}


// GALLERY
function renderGallery() {
    var imgs = getImgs()
    var strHTML = imgs.map((img) =>
        `<img src="${img.url}" class="img-gallery"
            onclick="onImgSelect(${img.id - 1})" alt="img">`)

    strHTML.unshift(`<div class="gallery-conteiner" >
           
            <section class="grid-conteiner-gallery">`)
    strHTML.push(`</section></div>`)
    var elGallery = document.querySelector('.main-conteiner')
    elGallery.innerHTML = strHTML.join('')
    changeHeaderBtn('Gallery')
}


//EDITOR
function firstRenderMeme() {
    changeHeaderBtn()

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
        <img src="icon/switch.png" class="icon switch" onclick="onSwitchLine()" alt="">
        <img src="icon/delete.png" class="icon delete"  onclick="renderGallery()" name="delete-text" alt="">
        <button class="share">Share</button>
        <input type="range" id="" value="30" min="20" max="45" onchange="this.title=this.value ,onChangeSize(this.value)">
        <select onchange="onGetFont(this.value)" name="" id="">
        <option value="Impact" >Impact</option>
        <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
        <option value=" Arial"> Arial</option>
        <option value="FascinateInline">FascinateInline</option>
        </select>
        <button class="download">Download</button>
        <img src="icon/save.png" class="icon save" onclick="onSaveToStorage()" alt="">
        <img src="icon/plus.png" class="icon plus" onclick="onChangeFontSize(3)" name="plus-font-size" alt="">
        <img src="icon/reduce2.png" class="icon minus" onclick="onChangeFontSize(-3)" name="minus-font-size" alt="">
        <input type="color" value="#ffffff" id="color-line" onchange="onChangeColor(this.value)">
        <button  class="icon imj1" onclick="onAddIcon('🤬')">🤬</button>
        <button class="icon imj2" onclick="onAddIcon('😎')">😎</button>
        <button class="icon imj3" onclick="onAddIcon('🐰')">🐰</button>
        <button class="icon imj4" onclick="onAddIcon('🤣')">🤣</button>
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
                // changeLineIdx(id)
                drawText(line.txt, 40, 50)
            }
            if (id === 1) {
                // changeLineIdx(id)
                drawText(line.txt, 40, gCanvas.height - 50)
            }
            if (id === 2) {
                drawText(line.txt, 40, gCanvas.height - 150)
            }
        })

    }
}

function renderSaveImg() {
    let imgs = _loadFromStorage()
    imgs = imgs.split('data')
    let strHTML = imgs.map((img, id) => {
        if (!id) return
        return `<img src="data${img}" class="img-gallery"
                onclick="onImgSelect(${gImgsSave[id]})"/>`
    })
    strHTML.unshift(`<div class="gallery-conteiner" >
            <input type="search" name="" class="search-key" id="" placeholder="Search"></input>
            <section class="grid-conteiner-gallery">`)
    strHTML.push(`</section></div>`)
    var elGallery = document.querySelector('.main-conteiner')
    elGallery.innerHTML = strHTML
    console.log(imgs);
    changeHeaderBtn('Save')
}

function onFilterImgs(val) {
    getFilterImgs(val)
    renderGallery()
}

function onDrawText(txt) {
    const msg = setLineTxt(txt)
    if (msg) console.log(msg);
    renderMeme()
}

function onAddIcon(icon){
    console.log(icon);
    addIcon(icon)
    renderMeme()
}

function onImgSelect(idx = getRandomInt(0, gImgs.length), isRandom = false) {
    saveCurImg(idx, isRandom)
    firstRenderMeme()
}

function onChangeFontSize(size) {
    changeFontSize(size)
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

function onSwitchLine() {
    clearInput()
    switchLine()
}

function onGetFont(font) {
    console.log(font);
    getFont(font)
    renderMeme()
}

function onSaveToStorage() {
    _saveToStorage()
}

function onAddLine() {
    clearInput()
    const msg = addLine()
    if (msg) {
        console.log(msg)
        return
    }
    renderMeme()
}

function clearInput(selector = '.txt-meme', val='') {
    document.querySelector(`${selector}`).value = val
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

