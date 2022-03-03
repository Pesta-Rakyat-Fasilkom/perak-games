import { createContext, FunctionalComponent } from 'preact'
import { useContext, useEffect, useReducer, useState } from 'preact/hooks'
import GameContextProps from '../interface/GameContext'

export const GameContext = createContext({} as GameContextProps)
export const useGameContext = () => useContext(GameContext)

const counterReducer = (state: number, action: string) => {
    switch (action) {
        case 'increment':
            return state + 1
        case 'decrement':
            return state - 1
        case 'reset':
            return 0
        default:
            throw new Error('Unexpected action')
    }
}

const deltaReducer = (state: number, delta: number) => state + delta

export const GameContextProvider: FunctionalComponent = ({ children }) => {
    const [startTime, setStartTime] = useState(0)
    const [wordsCount, mutateWordsCount] = useReducer(counterReducer, 0)
    const [charCount, mutateCharCount] = useReducer(deltaReducer, 0)
    const [expectedCharCount, mutateExpectedCount] = useReducer(deltaReducer, 0)
    const [strokeCount, mutateStrokeCount] = useReducer(counterReducer, 0)
    const [gameStopped, setGameStop] = useState(false)

    const [inputs, setInputs] = useState<string[]>([])
    const appendInputs = (newInputs: string[]) => setInputs([...inputs, ...newInputs])

    const [accuracy, setAccuracy] = useState(0)
    const [wpm, setWpm] = useState(0)

    useEffect(() => {
        setAccuracy(((2 * expectedCharCount - strokeCount) / expectedCharCount) * 100)
        setWpm((strokeCount / 5) * 2 * Math.min(accuracy, 1))
    }, [wordsCount])

    return (
        <GameContext.Provider
            value={{
                startTime,
                wordsCount,
                charCount,
                expectedCharCount,
                strokeCount,
                gameStopped,
                inputs,
                wpm,
                accuracy,
                mutateWordsCount,
                mutateCharCount,
                mutateExpectedCount,
                mutateStrokeCount,
                stopGame: () => setGameStop(true),
                startGame: () => setStartTime(Date.now() / 1000),
                appendInputs,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}
