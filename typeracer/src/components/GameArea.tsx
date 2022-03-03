import { FunctionalComponent } from 'preact'
import { useEffect, useState, useRef } from 'preact/hooks'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import { useGameContext } from '../context/GameContext'
import GameProps from '../interface/Game'
import Word from './Word'

const GameArea: FunctionalComponent<GameProps> = ({ words, onProgress, frozen, removeWords }) => {
    const [currentWord, setCurrentWord] = useState(words[0])
    const [currentProgress, setProgress] = useState('')
    const [history, setHistory] = useState<string[]>([])
    const [cursorOffset, setCursorOffset] = useState(0)

    // idk just guessing
    const fontWidth = 14.35

    const currentWordElem = useRef<HTMLDivElement>(null)
    const {
        startTime,
        startGame,
        mutateWordsCount,
        mutateCharCount,
        mutateExpectedCount,
        mutateStrokeCount,
        appendInputs,
        gameStopped,
    } = useGameContext()

    useEffect(() => {
        if (startTime == 0 && currentProgress.length > 0) {
            startGame()
        }

        if (currentProgress[currentProgress.length - 1] == ' ' && currentProgress.length != 1) {
            if (currentProgress.trim() == currentWord) mutateWordsCount('increment')
            mutateCharCount(currentProgress.length)
            mutateExpectedCount(currentWord.length + 1)

            let nextIdx = words.indexOf(currentWord) + 1
            setCurrentWord(words[nextIdx])
            setProgress('')

            const currentElemLeft = currentWordElem.current?.getBoundingClientRect().left ?? -1
            const nextElemLeft = currentWordElem.current?.nextElementSibling?.getBoundingClientRect().left ?? 0
            if (currentElemLeft > nextElemLeft) {
                let removedElemCount = 0
                let currentElem: Element | null = currentWordElem.current
                while (currentElem) {
                    removedElemCount++
                    currentElem = currentElem.previousElementSibling
                }

                appendInputs([...history, currentProgress.trim()])
                setHistory([])
                setCursorOffset(0)
                removeWords(removedElemCount)
            } else {
                setHistory((current) => [...current, currentProgress.trim()])
                let delta: number
                if (currentProgress.trim().length > currentWord.length) {
                    delta = currentProgress.length - 1
                } else {
                    delta = currentWord.length
                }
                setCursorOffset((current) => current + delta + 1)
            }
        }
    }, [currentProgress])

    useEffect(() => {
        if (gameStopped) {
            mutateCharCount(currentProgress.length)
            mutateExpectedCount(currentWord.length + 1)
        }
    }, [gameStopped])

    return (
        <>
            <KeyboardEventHandler
                isDisabled={gameStopped}
                handleKeys={['alphabetic', 'backspace', 'space']}
                onKeyEvent={(key, e) => {
                    if (key == 'space') {
                        key = ' '
                    }

                    if (key == 'backspace') {
                        setProgress((current) => current.slice(0, current.length - 1))
                    } else {
                        mutateStrokeCount('increment')
                        setProgress((current) => current + key)
                    }
                    console.log(currentProgress + key)
                }}
            />
            <div className="relative w-full h-[128px]">
                <div
                    className="border-l-4 border-l-grey border-opacity-75 h-[2rem] absolute animate-pulse transition-all"
                    style={{
                        left: (currentProgress.length + cursorOffset) * fontWidth + 'px',
                    }}
                />
                <div className="flex flex-row font-mono select-none flex-wrap max-h-[128px] overflow-hidden text-2xl absolute">
                    {words.slice(0, history.length).map((word, idx) => {
                        return <Word word={word} wordProgress={history[idx]} isProcessing={true} />
                    })}

                    <Word
                        divRef={currentWordElem}
                        word={words[history.length]}
                        wordProgress={currentProgress.trim()}
                        isProcessing={true}
                    />

                    {words.slice(history.length + 1, history.length + 50).map((word, idx) => {
                        return <Word word={word} wordProgress={''} isProcessing={false} />
                    })}
                </div>
            </div>
        </>
    )
}

export default GameArea
