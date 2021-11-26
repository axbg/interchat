const respondWith = (ctx, status, message) => {
    ctx.status = status
    ctx.body = { "message": message }
}

module.exports = {
    respondWith
}