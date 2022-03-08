const playBtn = document.getElementById('playbtn')
const canvas = document.getElementById('badapple')
const messageElem = document.getElementById('messageText')
const warnElem = document.getElementById('warnText')

const ctx = canvas.getContext('2d')
let currentOffset = 0
var lastPixelData = {}

var audio
var resJson
var lyricsJson
var intervalId
var lagCount = 0

// padding-x: 3rem
const padX = 2 * 3 * 16
const width = Math.min((window.innerWidth > 0 ? window.innerWidth : screen.width) - padX, 640)
const multip = width / 640

onload = async function () {
    try {
        audio = new Audio('audio.ogg')
        let res = await axios.get('./frames.gz', {
            onDownloadProgress: (progressEvent) => {
                messageElem.innerText = `Loading... ${Math.floor((progressEvent.loaded / progressEvent.total) * 100)}%`
            },
            responseType: 'arraybuffer',
        })
        let resBuf = res.data

        resJson = JSON.parse(new TextDecoder().decode(pako.ungzip(resBuf)))
        // Clear memory
        resBuf = null
        res = await fetch('./lyrics.json')
        lyricsJson = await res.json()

        messageElem.innerText = 'Loaded.'
        playBtn.style.display = 'block'
        canvas.style.display = 'block'

        canvas.width = width
        canvas.height = 480 * multip
    } catch {
        messageElem.innerText = 'Load failed!'
    }
}

async function startDraw() {
    if (currentOffset >= 6570) {
        clearInterval(intervalId)
        messageElem.innerHTML = "<a href='https://rorre.xyz'>Ren</a> made this."
        return
    }

    // Clear and redraw background
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let x = 0; x < 64; x++) {
        for (let y = 0; y < 48; y++) {
            let pixelDatas = resJson[x][y]
            let found = false
            let alpha = -1

            for (let i = 0; i < pixelDatas.length; i++) {
                let curr = pixelDatas[i]
                // frame list is sorted, by this point we will never find it,
                if (curr[0] > currentOffset) break
                if (curr[0] == currentOffset) {
                    alpha = curr[1]
                    found = true
                    pixelDatas.splice(i, 1)
                    break
                }
            }

            // Use previous alpha value if not found
            if (!found) {
                alpha = lastPixelData[x + '|' + y]
            }

            lastPixelData[x + '|' + y] = alpha

            // Only draw if alpha is not 0 (not black)
            if (alpha != 0) {
                ctx.fillStyle = 'rgba(255, 255, 255, ' + (alpha / 255).toFixed(2) + ')'
                ctx.fillRect(x * 10 * multip, y * 10 * multip, 10 * multip, 10 * multip)
            }
        }
    }
}

function start() {
    playBtn.remove()
    audio.play()

    intervalId = setInterval(async () => {
        await startDraw()
        let expectedOffset = Math.floor(audio.currentTime / (1 / 30))
        if (Math.abs(currentOffset - expectedOffset) > 20) {
            lagCount += 1
            currentOffset = expectedOffset
            warnElem.style.display = 'block'
        } else {
            currentOffset += 1
        }

        if (lyricsJson.length > 0 && currentOffset >= lyricsJson[0][0]) {
            messageElem.innerText = lyricsJson[0][1]
            lyricsJson.splice(0, 1)
        }
    }, 1000 / 29.8)
}
