import { FunctionalComponent } from 'preact'
import WordProps from '../interface/Word'

const Word: FunctionalComponent<WordProps> = ({ divRef, word, wordProgress, isProcessing }) => {
    return (
        <div ref={divRef}>
            {word.split('').map((char, idx) => (
                <span
                    className={
                        isProcessing && wordProgress.length > idx
                            ? word[idx] == wordProgress.charAt(idx)
                                ? 'text-success'
                                : 'text-danger'
                            : ''
                    }
                >
                    {wordProgress.length > idx ? wordProgress.charAt(idx) : char}
                </span>
            ))}
            {wordProgress
                .slice(word.length)
                .split('')
                .map((char) => (
                    <span className="text-danger">{char}</span>
                ))}
            <span>&nbsp;</span>
        </div>
    )
}

export default Word
