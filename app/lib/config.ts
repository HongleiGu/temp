import Redis from 'ioredis';

// Load the Redis URL from environment variables
const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
throw new Error('REDIS_URL environment variable is not set');
}

// Initialize the Redis client
const redis = new Redis(REDIS_URL)

redis.on('connect', () => {
console.log('Connected to Redis successfully');
});

redis.on('error', (error) => {
console.error('Error connecting to Redis:', error);
});

export default redis;