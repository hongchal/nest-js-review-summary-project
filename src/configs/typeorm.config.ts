import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";

const dbConfig = config.get("db");

export const TypeORMConfig : TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_USERNAME || dbConfig.password,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: dbConfig.synchronize,
}

