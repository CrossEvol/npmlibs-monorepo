import 'dotenv/config';

describe('keyv tests', () => {
  test('env variables should defined', () => {
    expect(process.env.SQLITE_DATABASE_URL).toBeDefined();
    expect(process.env.POSTGRES_DATABASE_URL).toBeDefined();
    expect(process.env.MYSQL_DATABASE_URL).toBeDefined();
    expect(process.env.REDIS_URL).toBeDefined();
  });
});
