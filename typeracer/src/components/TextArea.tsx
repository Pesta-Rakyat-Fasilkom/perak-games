import { FunctionalComponent } from 'preact'

const TextArea: FunctionalComponent = ({ children }) => {
    return <p className="py-[64px] font-retro w-full text-center text-xl text-white animate-pulse">{children}</p>
}

export default TextArea
