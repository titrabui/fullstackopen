const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Book = require('./models/book')
const Author = require('./models/author')

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.filter(b => b.author.name === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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
        console.log(error)
      }
    },
    editAuthor: async (root, args) => {
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
        console.log(error)
      }
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
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
