const { redisClient } = require('./redis')
const axios = require('axios')

const { User } = require('./db/models')

module.exports = {

    getSpeciesPokemon: async (req, res) => {
        try {
            const idSpecies = req.params.idSpecies

            const redisKey = `pokemon:id_species:${idSpecies}`
            const redis = await redisClient()
            const checkCacheRedis = await redis.get(redisKey)

            if (checkCacheRedis) {
                return res.status(200).json({ from: 'redis cache', data: JSON.parse(checkCacheRedis) })
            }

            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${idSpecies}`
            )

            const responseData = response.data;

            await redis.set(redisKey, JSON.stringify(responseData), { EX: 10 })

            return res.status(200).json({ from: 'database', data: responseData })


        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'internal server error' })
        }
    },

    getUsers: async (req, res) => {
        try {

            const redisKey = `users:allUser`
            const redis = await redisClient()
            const checkCacheRedis = await redis.get(redisKey)

            if (checkCacheRedis) {
                return res.status(200).json({ from: 'redis cache', data: JSON.parse(checkCacheRedis) })
            }

            const users = await User.findAll()

            await redis.set(redisKey, JSON.stringify(users))

            return res.status(200).json({ from: 'database', data: users })

        } catch (error) {
            console.log(error)
            return res.status(500).json('internal server error')
        }
    },

    getUserById: async (req, res) => {
        try {

            const userId = req.params.userId

            const redisKey = `users:id:${userId}`
            const redis = await redisClient()
            const checkCacheRedis = await redis.get(redisKey)

            if (checkCacheRedis) {
                return res.status(200).json({ from: 'redis cache', data: JSON.parse(checkCacheRedis) })
            }

            const user = await User.findOne({
                where: {
                    id: userId
                }
            })

            await redis.set(redisKey, JSON.stringify(user))

            return res.status(200).json({ from: 'database', data: user })

        } catch (error) {
            console.log(error)
            return res.status(500).json('internal server error')
        }
    }
}