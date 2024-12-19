import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Author } from "./entity/Author"
import { Post } from "./entity/Post"
import { Comment } from "./entity/Comment"
import { Initial1734648638330 } from "./migration/1734648638330-initial"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User,Author,Post,Comment],
    migrations: [Initial1734648638330],
    subscribers: [],
})
