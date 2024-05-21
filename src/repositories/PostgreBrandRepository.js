const pg = require('pg')
const Brand = require('../entities/Brand')

class PostgreBrandRepository {
    constructor(baseURI) {
        this.baseURI = baseURI
    }

    async getBrands() {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`SELECT * FROM brands`)
        await client.end()
        return result.rows
    }

    async create(brand) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`INSERT INTO brands (name) VALUES ($1) RETURNING *`,
            [brand.name])
        await client.end()
        return new Brand(result.rows[0].name, result.rows[0].id)
    }

    async deleteBrand(id) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`DELETE FROM brands WHERE id = $1`, [id])
        await client.end()
        return ''
    }

    async editBrand(brand) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`UPDATE brands SET name = $1 WHERE id = $2`,
            [brand.name, brand.id])
        await client.end()
        return new Brand(brand.name, brand.id)
    }

    async wipe() {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`DELETE FROM brands`)
        await client.end()
    }

    async findByID(id) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`SELECT * FROM brands WHERE id = $1`, [id])
        await client.end()
        if (result.rows.length === 0) {
            return undefined
        }
        return new Brand(result.rows[0].name, result.rows[0].id)
    }

    async findByName(name) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`SELECT * FROM brands WHERE name = $1`, [name])
        await client.end()
        if (result.rows.length === 0) {
            return undefined
        }
        return new Brand(result.rows[0].name, result.rows[0].id)
    }
}

module.exports = PostgreBrandRepository