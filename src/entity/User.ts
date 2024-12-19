import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Author } from "./Author"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @OneToMany(() => Author, (autor) => autor.completeName, {cascade: true})
    fleet: Array<Author>

}
