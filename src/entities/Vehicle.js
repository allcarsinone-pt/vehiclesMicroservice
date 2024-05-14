class Vehicle {

    constructor({standid, brandid, gastypeid, model, year, mileage, price, availability, description, brandname, gastypename, id, photos}) {
        this.standid = standid;
        this.brandid = brandid;
        this.gastypeid = gastypeid;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.price = price;
        this.availability = availability;
        this.description = description;
        this.brandname = brandname;
        this.gastypename = gastypename;
        this.id = id;
        this.photos = photos || []
    }

    toJson() {
        return { ...this }
    }

    editVehicle(vehicleDto) {
        this.standid = vehicleDto.standid ? vehicleDto.standid : this.standid;
        this.brandid = vehicleDto.brandid ? vehicleDto.brandid : this.brandid;
        this.gastypeid = vehicleDto.gastypeid ? vehicleDto.gastypeid : this.gastypeid;
        this.model = vehicleDto.model ? vehicleDto.model : this.model;
        this.year = vehicleDto.year ? vehicleDto.year : this.year;
        this.mileage = vehicleDto.mileage ? vehicleDto.mileage : this.mileage;
        this.price = vehicleDto.price ? vehicleDto.price : this.price;
        this.availability = vehicleDto.availability ? vehicleDto.availability : this.availability;
        this.description = vehicleDto.description ? vehicleDto.description : this.description;
    }

    static create(vehicleDto) {
        if(!vehicleDto.standid || !vehicleDto.brandid || !vehicleDto.gastypeid || !vehicleDto.model || !vehicleDto.year || !vehicleDto.mileage || !vehicleDto.price || !vehicleDto.availability || !vehicleDto.description) {
            throw new Error('Invalid vehicle data');
        }
        
        return new Vehicle(vehicleDto);
    }
}

module.exports = Vehicle