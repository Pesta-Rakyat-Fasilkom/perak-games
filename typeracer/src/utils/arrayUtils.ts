export function randomPick<T>(arr: T[]): T {
    let idx = Math.floor(Math.random() * arr.length)
    return arr[idx]
}
