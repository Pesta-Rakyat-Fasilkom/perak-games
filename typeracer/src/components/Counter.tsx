import { FunctionalComponent } from 'preact'
import { useGameContext } from '../context/GameContext'

const Counter: FunctionalComponent = () => {
    const { wordsCount, charCount, expectedCharCount, strokeCount, wpm, accuracy } = useGameContext()

    return (
        <>
            <span>
                WPM: {wpm.toFixed(2)} ({accuracy.toFixed(2)}%)
            </span>
            <span>
                {wordsCount}/{expectedCharCount}/{charCount}/{strokeCount}
            </span>
        </>
    )
}

export default Counter
