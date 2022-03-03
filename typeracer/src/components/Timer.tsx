import { FunctionalComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useGameContext } from '../context/GameContext'

const Timer: FunctionalComponent = () => {
    const [countdown, setCountdown] = useState(30)
    const { startTime, stopGame } = useGameContext()

    let interval: number
    useEffect(() => {
        if (startTime == 0) return
        interval = setInterval(() => {
            setCountdown((current) => current - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [startTime])

    useEffect(() => {
        if (countdown > 0) return
        // stopGame()
        clearInterval(interval)
    }, [countdown])

    return <div className="font-retro">{countdown}</div>
}

export default Timer
