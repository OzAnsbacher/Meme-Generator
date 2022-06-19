'use strict'

//to fix switch line btn

const KEY = 'memes'
const gKeywords = ['funny', 'bad', 'nice', 'good', 'animal', 'big', 'old', 'clever']

var gKeywordsObj = {}
var gLetFilter = ''
var gImgsSave = []
var gFont
var gNumImgs = 24
var gImgs = []
var gMeme = {
    selectedImgId: 1, selectLineIdx: 0,
    //todo: pos: x, y
    line: [{ txt: 'boom!!', size: 30, aline: 'left', color: '', stoke: '' }]
}
const memesSentences = [
    'I never eat falafel',
    'DOMS DOMS EVERYWHERE',
    'Stop Using i in for loops',
    'Armed in knowledge',
    'Js error "Unexpected String"',
    'One does not simply write js',
    // 'I`m a simple man i see vanilla JS, i click like!',
    // 'JS, HTML,CSS?? Even my momma can do that',
    'May the force be with you',
    'I know JS',
    // 'JS Where everything is made up and the rules dont matter',
    // 'Not sure if im good at programming or good at googling',
    'But if we could',
    'JS what is this?',
    // 'Write hello world , add to cv 7 years experienced',
]

function creatImgs() {
    for (let i = 1; i <= gNumImgs; i++) {
        let keywords = gKeywords[getRandomInt(0, gKeywords.length)]
        keywords += ' ' + gKeywords[getRandomInt(0, gKeywords.length)]
        gImgs.push(creatImg(i, keywords))
    }
    saveCurImg(0)
}

function creatImg(id, argument) {
    return {
        id,
        url: `img/img${id}.jpg`,
        keywords: argument
    }
}

function rateKeywords() {
    gImgs.forEach(img => {
        let key = img.keywords.split(' ')
        for (let i = 0; i < key.length; i++) {
            if (!gKeywordsObj[key[i]]) gKeywordsObj[key[i]] = 0
            gKeywordsObj[key[i]] += 1
        }
    })
    // return gKeywordsObj
}

function getKeywords() {
    return gKeywordsObj
}

function updateKeyWords(key) {
    gKeywordsObj[key] += 1
}

function getMeme() {
    // console.log(gMeme);
    return gImgs[gMeme.selectedImgId]
}

function saveCurImg(idx, isRandom) {
    gMeme.line = []
    gMeme.line[0] = getNewLine(isRandom, 0)
    if (isRandom) {
        for (let i = getRandomInt(0, 3); i > 0; i--) {
            gMeme.line[i] = getNewLine(isRandom, i)
        }
    }
    gMeme.selectedImgId = idx
    gMeme.selectLineIdx = 0
}

function getNewLine(isRandom, numLine = 1 + gMeme.selectLineIdx) {
    let txt = 'What is your smart sentence?'
    let size = 30
    let color = '#ffffff'
    let stoke = '#000000'
    if (isRandom) {
        txt = memesSentences[getRandomInt(0, memesSentences.length)]
        size = getRandomInt(20, 40)
        color = getRandomColor()
        stoke = checkDarkColor(color)
        isRandom = false
    }

    return {
        txt: txt,
        size,
        aline: 'left',
        color,
        pos: { x: 50, y: numLine * 100 + 50 }
    }
}

function randomColor() {
    gMeme.line[gMeme.selectLineIdx].color = getRandomColor()
}

function getStyle(id) {
    const memeStyle = getStyleServise(id)
    return {
        font: `${memeStyle.size}px ${setFont()}`,
        fill: memeStyle.color,
        stoke: memeStyle.stoke,
        bold: 1
    }
}

function changeFontSize(size) {
    if (gMeme.line[gMeme.selectLineIdx].size > 40) return
    if (gMeme.line[gMeme.selectLineIdx].size < 20) return
    gMeme.line[gMeme.selectLineIdx].size += size
}

function _saveToStorage() {
    gImgsSave.push(gMeme.selectedImgId)
    console.log(gImgsSave);
    var img = gCanvas.toDataURL('image/jpeg')
    img += _loadFromStorage()
    saveToStorage(KEY, img)
}

function _loadFromStorage() {
    return loadFromStorage(KEY)
}

function getFont(font) {
    gFont = font
}

function setFont() {
    return gFont
}

function changeColor(color) {
    gMeme.line[gMeme.selectLineIdx].color = color
}

function changeSize(size) {
    gMeme.line[gMeme.selectLineIdx].size = size
}

function addLine() {
    if (gMeme.line.length < 3) {
        gMeme.line.push(getNewLine())
        switchLine()
        return ''
    }
    return 'There is not enough space'
}

function switchLine() {
    gMeme.selectLineIdx++
    if (gMeme.selectLineIdx >= gMeme.line.length) gMeme.selectLineIdx = 0
}

function setLineTxt(text) {
    if (gMeme.line[gMeme.selectLineIdx].size * text.lastIndexOf('') < gCanvas.width * 1.5) {
        gMeme.line[gMeme.selectLineIdx].txt = text
        clearInput(undefined, gMeme.line[gMeme.selectLineIdx].txt)
        return ''
    } else return 'Open new row'
}

function addIcon(icon) {
    // if (gMeme.line[gMeme.selectLineIdx].size * gMeme.line[gMeme.selectLineIdx].txt.lastIndexOf('') < gCanvas.width * 1.5) {
    gMeme.line[gMeme.selectLineIdx].txt += icon
    clearInput(undefined, gMeme.line[gMeme.selectLineIdx].txt)
    // }
}

//todo: lines
function getLineTxt() {
    return gMeme.line
}

function getStyleServise(id) {
    return gMeme.line[id]
}

function getLineIdx() {
    return gMeme.selectLineIdx
}

function changeLineIdx(lineIdx) {
    gMeme.selectLineIdx = lineIdx
}

function getFilterImgs(val) {
    gLetFilter = val
}

function setFilterImgs() {
    return gImgs.filter(img => img.keywords.includes(gLetFilter))
}

function getImgs() {
    return setFilterImgs()
}