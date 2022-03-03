import { FunctionalComponent } from 'preact'
import { useGameContext } from '../context/GameContext'

const Counter: FunctionalComponent = () => {
    const { wordsCount, charCount, strokeCount } = useGameContext()

    return (
        <div className="font-retro">
            {wordsCount}/{charCount}/{strokeCount}
        </div>
    )
}

export default Counter
