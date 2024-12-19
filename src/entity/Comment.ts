import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @Column()
    belongsToPost: string
    
    @Column()
    belongsToUser: string

}