import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"
import { User } from "./User"
import { Post } from "./Post"

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    surname: string;

    @Column()
    completeName: string;

    @Column()
    tags: string;

    @Column()
    isAUser: boolean;
    
    @ManyToOne(() => User, (user) => user.fleet, {
        onDelete: "CASCADE"
    })
    user: User

    @ManyToOne(() => Post, (post) => post.fleet, {
        onDelete: "CASCADE"
    })
    post: Post

}
