var gameData = {}

function getUuid() {
    let uuid
    uuid = localStorage.getItem('uuid')
    if (uuid) return uuid
    uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    )
    localStorage.setItem('uuid', uuid)
    return uuid
}

function uploadGameData() {
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(gameData), '').toString()
    var result = pako.gzip(ciphertext)
    fetch('/up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
        },
        body: new Blob([result.buffer]),
    })
}

function reset() {
    gameData = {
        uuid: getUuid(),
        score: 0,
        points: [],
        keystrokes: [],
    }
}
