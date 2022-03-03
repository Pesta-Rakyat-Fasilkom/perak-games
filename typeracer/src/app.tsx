import { useEffect, useState } from 'preact/hooks'
import Counter from './components/Counter'
import GameArea from './components/GameArea'
import Timer from './components/Timer'
import { GameContextProvider } from './context/GameContext'
import { randomPick } from './utils/arrayUtils'

export function App() {
    const [words, setWords] = useState<string[]>([])
    useEffect(() => {
        async function fetchWords() {
            let response = await fetch('/words.txt')
            if (response.ok) {
                let wordList = await response.text()

                let availableWords = wordList.split('\n')
                let randomWords = []
                for (let i = 0; i < 200; i++) {
                    randomWords.push(randomPick(availableWords))
                }
                setWords(randomWords)
            }
        }

        fetchWords()
    }, [])

    const removeWords = (n: number) => {
        console.log('Remove')
        setWords((current) => current.slice(n, current.length))
    }

    return (
        <div
            className="flex flex-col items-center justify-center
                        min-h-screen min-w-screen bg-black-900 text-white"
        >
            <GameContextProvider>
                <div className="w-full px-8 sm:px-16 md:px-32 py-16 mx-auto">
                    <div className="flex flex-row w-full justify-between">
                        <Timer />
                        <Counter />
                    </div>
                    {words.length > 1 && (
                        <GameArea words={words} onProgress={(a) => null} frozen={false} removeWords={removeWords} />
                    )}
                </div>
            </GameContextProvider>
        </div>
    )
}
