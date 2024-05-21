const pg = require('pg')
const GasType = require('../entities/GasType')

class PostgreGasTypeRepository {
    constructor(baseURI) {
        this.baseURI = baseURI
    }

    async getGasTypes() {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`SELECT * FROM gastypes`)
        await client.end()
        return result.rows
    }

    async create(gasType) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`INSERT INTO gastypes (name) VALUES ($1) RETURNING *`,
            [gasType.name])
        await client.end()
        return new GasType(result.rows[0].name, result.rows[0].id)
    }

    async deleteGasType(id) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`DELETE FROM gastypes WHERE id = $1`, [id])
        await client.end()
        return ''
    }

    async editGasType(gasType) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`UPDATE gastypes SET name = $1 WHERE id = $2`,
            [gasType.name, gasType.id])
        await client.end()
        return new GasType(gasType.name, gasType.id)
    }

    async wipe() {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`DELETE FROM gastypes`)
        await client.end()
    }

    async findByID(id) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`SELECT * FROM gastypes WHERE id = $1`, [id])
        await client.end()
        if (result.rows.length === 0) {
            return undefined
        }
        return new GasType(result.rows[0].name, result.rows[0].id)
    }

    async findByName(name) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`SELECT * FROM gastypes WHERE name = $1`, [name])
        await client.end()
        if (result.rows.length === 0) {
            return undefined
        }
    }

}

module.exports = PostgreGasTypeRepository