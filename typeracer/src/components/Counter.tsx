import { FunctionalComponent } from 'preact'
import { useGameContext } from '../context/GameContext'

const Counter: FunctionalComponent = () => {
    const { wordsCount, charCount, expectedCharCount, strokeCount, wpm, accuracy } = useGameContext()
    const p = Math.min(1, wpm / 100)
    const r = Math.round(255 - (255 - 76) * p)
    const g = Math.round(255 - (255 - 198) * p)
    const b = Math.round(255 - (255 - 103) * p)
    return (
        <>
            <span
                style={{
                    color: `rgb(${r}, ${g}, ${b})`,
                }}
            >
                WPM: {wpm.toFixed(2)} ({accuracy.toFixed(2)}%)
            </span>
        </>
    )
}

export default Counter
