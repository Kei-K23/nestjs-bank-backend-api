import { DataSource, DataSourceOptions } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { configDotenv } from 'dotenv';

configDotenv({ path: '.env' });

const postgresDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: +`${process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['./src/migrations/*{.ts,.js}'],
  synchronize: false,
};
const dataSource = new DataSource(postgresDataSourceOptions);

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource, // add the datasource as a provider
      inject: [],
      useFactory: async () => {
        // using the factory function to create the datasource instance
        try {
          await dataSource.initialize(); // initialize the data source
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
export default dataSource;
