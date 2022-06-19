'use strict'


var gCanvas
var gCtx


function onInit() {
    gImgs = []
    gImgsSave = []
    gKeywordsObj = {}
    creatImgs()
    gFont = 'Impact'
    // firstRenderMeme()
    rateKeywords()
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

    strHTML.unshift(`<div class="gallery-conteiner" >${getStrKeywords()}
                     <section class="grid-conteiner-gallery">`)
    strHTML.push(`</section></div>`)
    var elGallery = document.querySelector('.main-conteiner')
    elGallery.innerHTML = strHTML.join('')
    changeHeaderBtn('Gallery')
}

function getStrKeywords() {
    let keywords = getKeywords()
    let strHTML = ''
    console.log(keywords);
    for (const keyword in keywords) {
        strHTML += `<button class="keywords" name="${keyword}" style="font-size:${keywords[keyword] * 4}px" onclick="onClickKeyWords(this.name)">${keyword}</button>`
    }
    return strHTML
}

function onClickKeyWords(key) {
    updateKeyWords(key)
    renderGallery()
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
        <img src="icon/color.png" class="icon" name="random-color" onclick="onRenderRandomColor()" alt="">
        <img src="icon/switch.png" class="icon switch" onclick="onSwitchLine()" alt="">
        <img src="icon/delete.png" class="icon delete" onclick="onClearStorage()" name="delete-text" alt="">
        <button class="share" onclick="uploadImg()">Share</button>
        <input type="range" id="" value="30" min="20" max="45" onchange="this.title=this.value ,onChangeSize(this.value)">
        <select onchange="onGetFont(this.value)" name="" id="">
        <option value="Impact" >Impact</option>
        <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
        <option value=" Arial"> Arial</option>
        <option value="FascinateInline">FascinateInline</option>
        </select>
       
        <a href="#" class="download btn" onclick="downloadImg(this)" download="my-img.jpg">Download</a>
        <img src="icon/save.png" class="icon save" onclick="onSaveToStorage()" alt="">
        <img src="icon/plus.png" class="icon plus" onclick="onChangeFontSize(3)" name="plus-font-size" alt="">
        <img src="icon/reduce2.png" class="icon minus" onclick="onChangeFontSize(-3)" name="minus-font-size" alt="">
        <input type="color" value="#ffffff" id="color-line" onchange="onChangeColor(this.value)">
        <button  class="icon imj imj1" onclick="onAddIcon('🤬')">🤬</button>
        <button class="icon imj imj2" onclick="onAddIcon('😎')">😎</button>
        <button class="icon imj imj3" onclick="onAddIcon('🐰')">🐰</button>
        <button class="icon imj imj4" onclick="onAddIcon('🤣')">🤣</button>
    </section>
</div>`

    //todo:change variable  
    var elEditor = document.querySelector('.main-conteiner')
    elEditor.innerHTML = strHTML
    gCanvas = document.querySelector('.canvas-style')
    gCtx = gCanvas.getContext('2d')
    addListeners()
    const img = getMeme()
    drawImgFromlocal(img.url)
}

function renderMeme() {
    const img = getMeme()
    drawImgFromlocal(img.url)
}


function drawImgFromlocal(imgSrc = 'img/img1.jpg') {
    // debugger
    var img = new Image()
    img.src = imgSrc
    // resizeCanvas()
    gCanvas = document.querySelector('.canvas-style')
    gCtx = gCanvas.getContext('2d')
    gCanvas.height = (img.height * gCanvas.width) / img.width
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        const memLines = getLineTxt()
        let lineIdx = getLineIdx()
        memLines.forEach((line, id) => {
            let text = line.txt
            if (id === lineIdx) text = `- ${line.txt}  -`
            drawText(text, line.pos.x, line.pos.y, id)
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

function onAddIcon(icon) {
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
    renderMeme()
}

function onGetFont(font) {
    console.log(font);
    getFont(font)
    renderMeme()
}

function onSaveToStorage() {
    _saveToStorage()
}

function onClearStorage(){
    clearStorage()
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

function onRenderRandomColor() {
    randomColor()
    renderMeme()
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    elLink.href = imgContent
}

function clearInput(selector = '.txt-meme', val = '') {
    document.querySelector(`${selector}`).value = val
}

function drawText(text, x, y, id) {
    gCtx.beginPath()
    const txtStyle = getStyle(id)
    gCtx.lineWidth = txtStyle.bold
    gCtx.strokeStyle = txtStyle.stoke
    gCtx.fillStyle = txtStyle.fill
    gCtx.font = txtStyle.font
    gCtx.fillText(text, x, y);//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y);//Draws (strokes) a given text at the given (x, y) position.
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-style')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}