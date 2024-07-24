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
             socket : {
                host: '127.0.0.1',
                port: 6379
            }
        });
        this.connect(); 
    }

    // adding connection to redis
    async connect(): Promise<void> {

        this.client.on("connect", () => {
             console.log("Connected to Redis");
        });
        // 
        this.client.on("error", (error: any) => {
          console.log("Error connecting to Redis", error);
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

        async blacklistToken(token: string, expiry: number) {
            await this.set(`blacklist_${token}`, "true", expiry);
        }

        async isTokenBlacklisted(token: string): Promise<boolean> {
            const result = await this.get(`blacklist_${token}`);
            return result !== null;
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
