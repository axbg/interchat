const respondWith = (ctx, status, message) => {
    ctx.status = status
    ctx.body = { "message": message }
}

const curateInstance = (instance) => {
    delete instance.id;
    delete instance.createdAt;
    delete instance.updatedAt;

    return instance;
}

module.exports = {
    respondWith,
    curateInstance
}