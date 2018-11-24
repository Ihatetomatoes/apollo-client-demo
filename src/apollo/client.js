import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";

const typeDefs = `
    type Message {
        id: Int!
        text: String
    }

    type User {
        id: String
        firstName: String
        lastName: String
        avatar: String
        email: String
    }

    type Query {
        messages: [Message]
        selectedUser: User
    }
    type Mutation {
        selectUser(user: User!): User @client
    }
`;

const client = new ApolloClient({
    uri: 'https://fakerql.com/graphql',
    clientState: {
        defaults: {
            messages: [
                {__typename: 'Message', id: 0, text: 'Cool message default.'},
                {__typename: 'Message', id: 1, text: 'Another great message default.'},
                {__typename: 'Message', id: 2, text: 'Third message from local state.'}
            ],
            selectedUser: null
        },
        resolvers: {
            Mutation: {
                selectUser: (_, { user }, { cache, getCacheKey }) => {
                    cache.writeData({ data: {selectedUser: user} });
                    return null;
                }
            }
        },
        typeDefs
    }
});

client.initQueryManager();

export default client;