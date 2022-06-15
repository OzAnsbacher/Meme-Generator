'use strict'

var gNumImgs = 24
var gImgs = []
const gKeywords = ['funny', 'bad', 'nice', 'good']
var gMeme = { selectedImgId: 1, selectLineIdx: 1, line: [{ txt: 'boom!!', size: 20, aline: 'left', color: '' }] }
const memesSentences = [
    'I never eat falafel',
    'DOMS DOMS EVERYWHERE',
    'Stop Using i in for loops',
    'Armed in knowledge',
    'Js error "Unexpected String"',
    'One does not simply write js',
    'I`m a simple man i see vanilla JS, i click like!',
    'JS, HTML,CSS?? Even my momma can do that',
    'May the force be with you',
    'I know JS',
    'JS Where everything is made up and the rules dont matter',
    'Not sure if im good at programming or good at googling',
    'But if we could',
    'JS what is this?',
    'Write hello world , add to cv 7 years experienced',
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

function saveCurImg(idx) {
    gMeme.selectedImgId = idx
    gMeme.selectLineIdx = 1
    gMeme.line[0].txt = memesSentences[getRandomInt(0, memesSentences.length)]
    gMeme.line[0].size = 35
    gMeme.line[0].color = 'white'
    gMeme.line[0].aline = 'left'
}

function setLineTxt(txt) {
    gMeme.line[0].txt = txt
}

function getLineTxt() {
    return gMeme.line[0].txt
}

function getStyleServise() {
    return gMeme.line[0]
}

function getLineIdx() {
    return gMeme.selectLineIdx
}

function getImgs(){
    return gImgs
}