const { redisClient } = require('./redis')
const axios = require('axios')

module.exports = {

    getSpeciesPokemon: async (req, res) => {
        try {
            const idSpecies = req.params.idSpecies
            const redisKey = `pokemon:id_species:${idSpecies}`

            const redis = await redisClient()
            const checkCacheRedis = await redis.get(redisKey)

            if (checkCacheRedis) {
                return res.status(200).json({ fromCache: true, data: JSON.parse(checkCacheRedis) })
            }

            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${idSpecies}`
            )

            const responseData = response.data;

            await redis.set(redisKey, JSON.stringify(responseData), { EX: 10 })

            return res.status(200).json({ fromCache: false, data: responseData })


        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'internal server error' })
        }
    }
}