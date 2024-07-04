import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { User } from '../users/entities/user.entity';
dotenvConfig({ path: '.env' });

const typeorm = {
  type: `${process.env.MYSQL_TYPE}`,
  host: `${process.env.MYSQL_HOST}`,
  port: `${process.env.MYSQL_TCP_PORT}`,
  database: `${process.env.MYSQL_DATABASE}`,
  username: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  entities: [User],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

export default registerAs('typeorm', () => typeorm);
export const connectionSource = new DataSource(typeorm as DataSourceOptions);
