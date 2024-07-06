import { AuthUseCases } from "../application/use-cases/AuthUseCases";
import { User } from "../domain/entities/User";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { AuthController } from "../interfaces/controllers/AuthController";


const initialUserData : Partial<User>[] = [
    {
        name: 'John Doe',
        email: 'johnDoe@gmail.com',
        password : '123456'
    },
    {
        name: 'abdelkader',
        email: 'a.khatir@gmail.com',
        password : '123456'
    }
];




export const loginUsers = async (): Promise<void> => {
    const authRepo = new UserRepository();
    const authUseCases = new AuthUseCases(authRepo);
    // const authController = new AuthController(authRepo);

    try {
        // check if i have uses in the db
        const users = await authRepo.getAllUsers();
        if (users.length > 0) {
            console.log('Users already exist, skipping initial data population.');
            
        }else
        {
            console.log('No users found, populating initial data...');
            await Promise.all(initialUserData.map(async (user) => {
                await authUseCases.register(user as User);
            }));
            console.log('Initial users created.');
        }
    } catch (error) {
        console.error('Error while creating initial users', error);
    }
   
};