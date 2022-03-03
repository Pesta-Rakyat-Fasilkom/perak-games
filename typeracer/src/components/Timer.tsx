import { FunctionalComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useGameContext } from '../context/GameContext'

const Timer: FunctionalComponent = () => {
    const [countdown, setCountdown] = useState(30)
    const [intervalId, setIntervalId] = useState(0)
    const { startTime, stopGame } = useGameContext()

    useEffect(() => {
        if (startTime == 0) return
        setIntervalId(
            setInterval(() => {
                setCountdown((current) => current - 1)
            }, 1000)
        )
    }, [startTime])

    useEffect(() => {
        if (countdown > 0) return
        stopGame()
        clearInterval(intervalId)
    }, [countdown])

    return <div className="font-retro text-lemon">{countdown}</div>
}

export default Timer
