export const parse = str => {
    try {
        return JSON.parse(str)
    } catch (err) {
        console.log(err)
        return {}
    }
}

export const stringify = data => {
    try {
        return JSON.stringify(data)
    } catch (err) {
        console.log(err)
        return ''
    }
}
