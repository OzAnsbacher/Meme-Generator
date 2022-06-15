'use strict'

var gNumImgs = 24
var gImgs = []
const gKeywords = ['funny', 'bad', 'nice', 'good']


function creatImgs() {
    for (let i = 1; i <= gNumImgs; i++) {
        const keywords = gKeywords[getRandomInt(0, gKeywords.length)]
        gImgs.push(creatImg(i, keywords))
    }
}

function creatImg(id, argument) {
    return {
        id,
        url: `img/img${id}.jpg`,
        keywords: argument
    }
}

function getMeme(idx = 0) {
    return gImgs[idx]
}