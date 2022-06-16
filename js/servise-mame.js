'use strict'

//to fix switch line btn

var gFont
var gNumImgs = 24
var gImgs = []
const gKeywords = ['funny', 'bad', 'nice', 'good']
var gMeme = {
    selectedImgId: 1, selectLineIdx: 0,
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
        const keywords = gKeywords[getRandomInt(0, gKeywords.length)]
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

function getMeme() {
    return gImgs[gMeme.selectedImgId]
}

function saveCurImg(idx, isRandom) {
    gMeme.line = []
    gMeme.line[0] = getNewLine(isRandom)
    if (isRandom) {
        for (let i = getRandomInt(0, 3); i > 0; i--) {
            gMeme.line[i] = getNewLine(isRandom)
        }
    }
    gMeme.selectedImgId = idx
    gMeme.selectLineIdx = 0
}

function getNewLine(isRandom) {
    let txt = 'What is your smart sentence?'
    let size = 30
    let color = '#ffffff'
    let stoke = '#000000'
    if (isRandom) {
        txt = memesSentences[getRandomInt(0, memesSentences.length)]
        size = getRandomInt(20, 51)
        color = getRandomColor()
        stoke = chackIsDarkColor(color)
        isRandom=false
    }
    return {
        txt: txt,
        size,
        aline: 'left',
        color
    }
}

function getStyle() {
    const memeStyle = getStyleServise()
    return {
        font: `${memeStyle.size}px ${setFont()}`,
        fill: memeStyle.color,
        stoke: memeStyle.stoke,
        bold: 3
    }
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
    if (gMeme.line[gMeme.selectLineIdx].size * text.lastIndexOf('') < gCanvas.width*1.5) {
        gMeme.line[gMeme.selectLineIdx].txt = text
        return ''
    } else return 'Open new row'
}

function getLineTxt() {
    return gMeme.line
}

function getStyleServise() {
    return gMeme.line[gMeme.selectLineIdx]
}

function getLineIdx() {
    return gMeme.selectLineIdx
}

function changeLineIdx(lineIdx) {
    gMeme.selectLineIdx = lineIdx
}

function getImgs() {
    return gImgs
}