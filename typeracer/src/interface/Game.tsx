interface GameProps {
    words: string[]
    onProgress: (arg0: number) => void
    frozen: boolean
    removeWords: (arg0: number) => void
}

export default GameProps
