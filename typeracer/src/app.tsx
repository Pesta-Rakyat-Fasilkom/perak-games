import { useEffect, useState } from 'preact/hooks'
import Counter from './components/Counter'
import GameArea from './components/GameArea'
import TextArea from './components/TextArea'
import Timer from './components/Timer'
import { GameContextProvider } from './context/GameContext'
import { randomPick } from './utils/arrayUtils'
import { isMobile } from './utils/mobile'

export function App() {
    const [isLoading, setLoading] = useState(true)
    const [encKey, setEncKey] = useState('default-key')
    const [words, setWords] = useState<string[]>([])

    const inMobile = isMobile.any()

    useEffect(() => {
        window.addEventListener('message', (e) => {
            console.log('New message: ' + e.data)
            if (e.data.startsWith('k:')) {
                setEncKey(e.data.split('k:')[1])
                console.log('Received key: ' + encKey)
            }
            if (e.data == 'reload') window.location.reload()
        })
        window?.top?.postMessage('ready', '*')
    }, [])

    useEffect(() => {
        async function fetchWords() {
            let response = await fetch('./words.txt')
            if (response.ok) {
                let wordList = await response.text()

                let availableWords = wordList.split('\n')
                let randomWords = []
                for (let i = 0; i < 500; i++) {
                    randomWords.push(randomPick(availableWords))
                }
                setWords(randomWords)
                setLoading(false)
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
            <GameContextProvider encKey={encKey}>
                <div className="w-full px-8 sm:px-16 md:px-32 py-16 mx-auto">
                    <div className="flex flex-row w-full justify-between font-retro">
                        <Timer />
                        <Counter />
                    </div>
                    {inMobile ? (
                        <TextArea>Game ini hanya dapat dimainkan pada Desktop.</TextArea>
                    ) : !isLoading && words.length > 1 ? (
                        <GameArea words={words} removeWords={removeWords} />
                    ) : (
                        <TextArea>Loading...</TextArea>
                    )}
                </div>
            </GameContextProvider>
        </div>
    )
}
