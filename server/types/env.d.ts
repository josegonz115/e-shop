declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            PORT: string;
            MONGO_URI:string;
            JWT_SECRET: string;
            PAYPAL_CLIENT_ID: string;
            PAYLAL_SECRET_KEY: string;
            PAGINATION_LIMIT:string;
        }
    }
}

export {}; // makes TypeScript treat file as module instead of script