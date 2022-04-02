let dot = '.'
const loading = 'LOADING'

setInterval(() => {
    document.getElementById("loading-container").innerText = `${loading}${dot}`
    dot = dot.length > 2 ? '.' : dot + '.'
}, 500)