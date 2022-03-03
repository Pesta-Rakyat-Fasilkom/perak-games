import { FunctionalComponent } from 'preact'
import { useGameContext } from '../context/GameContext'

const Counter: FunctionalComponent = () => {
    const { wordsCount, charCount, expectedCharCount, strokeCount } = useGameContext()

    return (
        <div className="font-retro">
            {wordsCount}/{expectedCharCount}/{charCount}/{strokeCount}
        </div>
    )
}

export default Counter
