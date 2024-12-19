import { AppDataSource } from "./data-source"
import { IsAUser, criarUsuario, criarAutor, listarTodosUsuarios, buscarUsuarioPeloNome, removerUsuario } from "./entity-mgr"
import { User } from "./entity/User"
import { Author } from "./entity/Author"
import { Post } from "./entity/Post"
import { Comment } from "./entity/Comment"

AppDataSource.initialize().then(async () => {

    //--------------------------------------------------------------
    // Insere usuario 1

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.name = "Karl Marx"
    user.email = "karl@gmail.com"
    await criarUsuario(user);
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    //--------------------------------------------------------------
    // Insere usuario 2

    console.log("Inserting a new user into the database...")
    const user2 = new User()
    user2.name = "Friedrich Engels"
    user2.email = "Friedrich@gmail.com"
    
    await criarUsuario(user2);
    console.log("Saved a new user with id: " + user2.id)

    console.log("Loading users from the database...")
    const users2 = await buscarUsuarioPeloNome(user2.name)
    console.log("Loaded users: ", users2)

    //--------------------------------------------------------------
    // Insere Autor 1

    console.log("Inserting a new Author into the database...")
    const author = new Author()
    author.surname = "Marx"
    author.completeName = "Karl Marx"
    author.tags = "Manifesto Comunista"
    author.isAUser = await IsAUser("Karl Marx");
    
    await criarAutor(author)
    console.log("Saved a new user with id: " + author.id)

    console.log("Loading users from the database...")
    const authors = await AppDataSource.manager.find(Author)
    console.log("Loaded users: ", authors)

    //--------------------------------------------------------------
    // Insere Autor 2

    console.log("Inserting a new Author into the database...")
    const author2 = new Author()
    author2.surname = "Engels"
    author2.completeName = "Friedrich Engels"
    author2.tags = "Manifesto Comunista"
    author2.isAUser = await IsAUser("Friedrich Engels");
    
    await criarAutor(author2)
    console.log("Saved a new user with id: " + author2.id)

    console.log("Loading users from the database...")
    const authors2 = await AppDataSource.manager.find(Author)
    console.log("Loaded users: ", authors2)

    listarTodosUsuarios().then(u => u.forEach(async u => await removerUsuario(u)));

}).catch(error => console.log(error))
