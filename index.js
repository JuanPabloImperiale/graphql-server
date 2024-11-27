import { gql, ApolloServer } from "apollo-server";

const persons = [
    {
        name : "Juan Pablo",
        phone : "08800245",
        street : "Puertas del sol norte 201",
        city : "Monterrey",
        id : " 123456789",

    },
    {
        name : "Michelle Ramirez",
        phone : "684164321",
        street : "Calle 13 ",
        city : "San Nicalas",
        id : "987654321",

    },
    {
        name : "Guachin ",
        phone : "996633225588",
        street : "Cucha123",
        city : "San Jeronimo",
        id : "885522114477",

    },
    {
        name : "Turrita",
        phone : "987456321",
        street : "Cucha321",
        city : "San Jeronimo",
        id : "996633114477",

    },
]

const typeDefs = gql` 
    type Person {
        name : String!
        phone : String
        street : String!
        city : String!
        id : ID!
}
    type Query {
        personCount : Int!
        allPersons : [Person]!

    }
`

const resolvers = {
    Query: {
        personCount: ()=> persons.length,
        allPersons: () => persons
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url})=> {
    console.log(`Server ready at ${url}`)
})
