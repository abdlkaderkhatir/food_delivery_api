import { Restaurent } from "../../domain/entities/Restaurent";


export class LocationService {

    // calculate distance between two points
    static calculateDistance = (lat1 : number, lon1 : number, lat2 : number, lon2 : number) : number =>  {
        let R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        let dLon = this.deg2rad(lon2-lon1); 
        let a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = R * c; // Distance in km 
        return d;
    }

    // convert degree to radian
    static deg2rad = (deg : number) => {
        return deg * (Math.PI/180)
    }


    static getNearRestaurents = async (restaurents : Restaurent[] , myLong: number , myLat : number) => {
        const nearRestaurents = [] as Restaurent[];
        restaurents.map((restaurent) => {
                let distance = this.calculateDistance(myLat, myLong, restaurent.latitude!, restaurent.longitude!);
                console.log('distance', distance);
                
                    if(distance <= 10) { // 20 km
                        nearRestaurents.push(restaurent);
                    }
        });
        return nearRestaurents;
    }
   
    
    static getNearRestaurentByLocation =  (restaurents : Restaurent[] , myLong: number , myLat : number) : Restaurent | null => {
        if(restaurents.length === 0) {
            return null;
        }

        let nearRestaurent = restaurents[0];

        let nearDistance = this.calculateDistance(myLat, myLong, nearRestaurent.latitude!, nearRestaurent.longitude!);

        restaurents.forEach((restaurent) => {
            let distance = this.calculateDistance(myLat, myLong, restaurent.latitude!, restaurent.longitude!);
            if(distance < nearDistance) {
                nearRestaurent = restaurent;
                nearDistance = distance;
            }
        });


        return nearRestaurent; 
    }



    
    
}

type RestaurentOrNyll = Restaurent | null;