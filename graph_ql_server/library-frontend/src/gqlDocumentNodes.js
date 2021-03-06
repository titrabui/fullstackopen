import { gql } from 'apollo-boost'

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
      }
      genres
      id
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
      }
      genres
      id
    }
  }
`

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation updateAuthor(
    $name: String!,
    $born: Int!
  ) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      bookCount
      id
    }
  }
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      token
      username
      name
    }
  }
`

export { ALL_BOOKS, CREATE_BOOK, ALL_AUTHORS, EDIT_AUTHOR, LOGIN }