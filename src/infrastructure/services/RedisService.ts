import { createClient } from "redis";
import { config } from "../../config";

class RedisService {
  private client: any;
  private static instance: RedisService; 

    public static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }
    
    constructor() {
        this.client = createClient({
            //  url: config.redis.url,
            username: config.redis.user_redis,
            password: config.redis.password_redis,
             socket : {
                host: config.redis.url_redis,
                port: parseInt(config.redis.port_redis as string),
            }
        });
        this.connect(); 
    }

    // adding connection to redis
    async connect(): Promise<void> {
        this.client.on("connect", () => { 
            console.log("Connected to Redis") 
            this.set("test", "test");
        });

        this.client.on("error", (error: any) => {
          console.log("Error connecting to Redis", error);
          throw error;
        });
        await this.client.connect();
    }
    // (async () => {await this.client.connect()})(); i tryed to added this in the constructor but it did not work

    async set(key: string, value: string, expiry?: number) {
        let options = {};

        if (expiry === undefined) {
            await this.client.set(key, value);
            return;
        }

        options = {
            EX: expiry,
        };

        await this.client.set(key, value, options);
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async del(key: string) {
        await this.client.del(key);
    }

    async setToken(userId: string, token: string, expiry: number) {
        await this.set(`client_${userId}`, token, expiry);
    }

    async getToken(userId: string): Promise<string | null> {
        // const result = await this.get(`blacklist_${token}`);
        const result = await this.get(`client_${userId}`);
        return result;
    }

    async delToken(userId: string) {
        await this.del(`client_${userId}`);
    }


    // public delete(key: string): void {
    //     this.client.del(key);
    // }

    // public exists(key: string): boolean {
    //     return this.client.exists(key);
    // }

    // public expire(key: string, seconds: number): void {
    //     this.client.expire(key, seconds);
    // }
}

export default RedisService;
