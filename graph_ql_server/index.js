const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    name: String!
    password: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    token: String!
    username: String!
    name: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      name: String!
      password: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      let filteredBooks = [...books]
      if (args.author) {
        filteredBooks = filteredBooks.filter(b => b.author.name === args.author)
      }
      
      if (args.genre) {
        filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
      }

      return filteredBooks
    },
    allAuthors: () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.filter(b => b.author.name === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          authorObject = new Author({
            name: args.author
          })
          author = await authorObject.save()
        }

        const book = new Book({ ...args, author: author._id })
        const savedBook = await book.save()
        return Book
          .findById(savedBook._id.toString())
          .populate('author')
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      updateData = {
        name: author.name,
        born: args.setBornTo
      }

      try {
        return Author
          .findByIdAndUpdate(author._id.toString(), updateData, { new: true })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      try {
        let user = new User(args)
        await user.validate()

        const saltOrArounds = 10
        const passwordHash = await bcrypt.hash(args.password, saltOrArounds)
        user = new User({ ...args, password: passwordHash })

        return user.save({ validateBeforeSave: false })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.password)

      if (!(user && passwordCorrect)) {
        throw new UserInputError("invalid username or password")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { token: jwt.sign(userForToken, process.env.SECRET), username: user.username, name: user.name }
    }
  }
}

mongoose.set('useFindAndModify', false)
logger.info('Connect to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('Connected to', config.MONGODB_URI)
  })
  .catch((error) => {
    logger.info('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
