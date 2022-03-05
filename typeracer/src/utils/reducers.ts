const counterReducer = (state: number, action: string) => {
    switch (action) {
        case 'increment':
            return state + 1
        case 'decrement':
            return state - 1
        case 'reset':
            return 0
        default:
            throw new Error('Unexpected action')
    }
}

const deltaReducer = (state: number, delta: number) => state + delta

export { counterReducer, deltaReducer }
