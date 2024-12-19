import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Author } from "./entity/Author";
import { Post } from "./entity/Post";
import { Comment } from "./entity/Comment";

export async function criarUsuario(user: User) {
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)
}

export async function criarAutor(autor: Author) {
    await AppDataSource.manager.save(autor);
    console.log("Saved a new author with id: " + autor.id)
}

export async function criarPublicacao(Publicacao: Post) {
    await AppDataSource.manager.save(Publicacao);
    console.log("Saved a new author with id: " + Publicacao.id)
}

export async function criarComentario(Comentario: Comment) {
    await AppDataSource.manager.save(Comentario);
    console.log("Saved a new comment with id: " + Comentario.id),0
}

export async function IsAUser(name: string) {
    console.log(`Searching user from db with name [${name}]...`)
    const usr = await AppDataSource.manager.findOneBy(User, {
        name: name
    });
    if(usr != null && usr.id > 0) {
        return true;
    } else{
        throw Error("Usuario nao encontrado!")
        return false;
    }
}

export async function listarTodosUsuarios() {
    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User, {
        relations: {
            fleet: true
        },
        relationLoadStrategy: "query"
    })
    console.log("Loaded users: ", users)
    return users;
}

export async function removerUsuario(user: User) {
    console.log("Deleting user from db...")
    await AppDataSource.manager.delete(User, user.id);
    console.log("user deleted: ", user)
}