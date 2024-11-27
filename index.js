import { gql, ApolloServer, UserInputError } from "apollo-server";
import { v1 as uuid } from 'uuid'

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
        name : "Guachin",
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
    type Address {
        street: String!
        city: String! 
    }
    type Person {
        name : String!
        phone : String
        address: Address!
        id : ID!
}
    type Query {
        personCount : Int!
        allPersons : [Person]!
        findPerson(name: String!): Person

    }

    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
    }
`

const resolvers = {
    Query: {
        personCount: ()=> persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name}= args
            return persons.find(person=> person.name === name)
        }
    },
    Mutation:{
        addPerson:(root, args)=>{
            if(persons.find(p=> p.name === args.name)){
                throw new UserInputError("Name must be unique", {
                    invalidArgs: args.name
                } )
            }
            const person= {...args, id: uuid()}
            persons.push(person)
            return person
        }

    },
    Person:{
        address : (root)=> {
            return{
                street : root.street,
                city : root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url})=> {
    console.log(`Server ready at ${url}`)
})
