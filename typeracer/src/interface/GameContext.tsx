interface GameContext {
    startTime: number
    wordsCount: number
    charCount: number
    expectedWordsCount: number
    expectedCharCount: number
    strokeCount: number
    gameStopped: boolean
    inputs: string[]
    wpm: number
    accuracy: number
    mutateWordsCount: (arg0: string) => void
    mutateExpectedWordsCount: (arg0: string) => void
    mutateCharCount: (arg0: number) => void
    mutateStrokeCount: (arg0: string) => void
    mutateExpectedCount: (arg0: number) => void
    startGame: () => void
    stopGame: () => void
    appendInputs: (arg0: string[]) => void
    uploadGameplay: () => void
}

export default GameContext
