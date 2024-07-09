const { createClient } = require('redis')
const { redisURL } = require('./config')

const redisClient = async () => {
    try {
        let connectRedisClient = createClient({ url: redisURL })
        connectRedisClient.on('error', (error) => {
            `Error : ${error}`
        })

        await connectRedisClient.connect()

        return connectRedisClient

    } catch (error) {
        console.log(error)
    }
}

module.exports = { redisClient }


