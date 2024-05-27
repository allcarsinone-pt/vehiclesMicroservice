const pg = require('pg')

class PostgreTestDriveRepository {

    constructor (baseURI) {
        this.baseURI = baseURI
    }

    async create (data) {

        const client = new pg.Client(this.baseURI)
        await client.connect()
         
        const result = await client.query(`INSERT INTO testdrives (vehicleid, date, username) VALUES ($1, $2, $3) RETURNING *`, [data.vehicleid, data.date, data.username])

        await client.end()
        return { ...result.rows[0] }
    } 
}

module.exports = PostgreTestDriveRepository