function countOverlap(base: String, target: String) {
    let count = 0
    for (let i = 0; i < Math.min(base.length, target.length); i++) {
        count += Number(base[i] == target[i])
    }
    return count
}

export { countOverlap }
