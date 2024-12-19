import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Author } from "./Author"

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;
    
    @Column()
    belongsToAuthor: string;

    @OneToMany(() => Author, (author) => author.completeName, {cascade: true})
    fleet: Array<Author>
}