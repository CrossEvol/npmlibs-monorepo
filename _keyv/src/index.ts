import 'dotenv/config';

console.log('Hello world!');
console.log(process.env.SQLITE_DATABASE_URL);
console.log(process.env.POSTGRES_DATABASE_URL);
console.log(process.env.MYSQL_DATABASE_URL);
console.log(process.env.REDIS_URL);
console.log(process.env.REDIS_USERNAME);
console.log(process.env.REDIS_PASSWORD);
