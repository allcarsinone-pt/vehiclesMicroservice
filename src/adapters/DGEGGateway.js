const axios = require('axios')


class DGEGGateway {

    constructor(baseURI) {
        this.baseURI = baseURI
    }

    async execute() {
        const response = await axios.get(`${this.baseURI}/api/PrecoComb/GetDadosPostoMapa?id=65949&f=json`, log)
        if(response.status !== 200) {
            throw new Error('Error on DGEGGateway')
        }



        const combustiveis = response.data.resultado.Combustiveis
        for(let combustivel of combustiveis) {
            combustivel.preco = combustivel.preco.replace(' €/litro', '')
            combustivel.preco = combustivel.preco.replace(',','.')
            combustivel.preco = parseFloat(combustivel.preco)
        }

        return combustiveis
    }
}

module.exports = DGEGGateway