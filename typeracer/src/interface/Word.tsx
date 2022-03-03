import { Ref } from 'preact/hooks'

interface WordProps {
    word: string
    wordProgress: string
    isProcessing: boolean
    divRef?: Ref<HTMLDivElement>
}

export default WordProps
