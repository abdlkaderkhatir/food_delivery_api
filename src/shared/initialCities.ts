import { City } from "../domain/entities/City";
import { CityRepository } from "../infrastructure/repositories/CityRepository";



const initialCities : Partial<City>[] = [
    {
        name: 'Oran',
        country: 'Algeria',
        longitude: 35.6970,
        latitude: -0.6300,
    },
    {
        name: 'Sidi Bel Abbes',
        country: 'Algeria',
        longitude: 35.1919,
        latitude: -0.6417,
    },
    {
        name: 'Ain Temouchent',
        country: 'Algeria',
        longitude: 35.2975,
        latitude: -1.1400,
    },
    {
        name: 'Mascara',
        country: 'Algeria',
        longitude: 35.4004,
        latitude: -0.1400,
    },
    {
        name: 'Mostaganem',
        country: 'Algeria',
        longitude: 35.9404,
        latitude: -0.0900,
    },
];



export const insertInitialCities = async () : Promise<void> => {
    const cityRepository = new CityRepository();
    
    try {
        const cities = await cityRepository.getAllCities();
        if (cities.length === 0) {
            console.log('No city items found, populating initial data...');
            for (const city of initialCities) {
                await cityRepository.create(city as City);
            }
            console.log('Initial city items created.');
        } else {
            console.log('City items already exist, skipping initial data population.');
        }
    } catch (error) {
        console.error('Error populating initial data:', error);
    }
}