import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';

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

const cache = new InMemoryCache();

class ApolloProviderWrapper extends Component {
  state = {
    client: null,
    loaded: false
  };

  async componentDidMount() {
    try {

      const client = new ApolloClient({
        cache,
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
      await persistCache({
        cache,
        storage: window.localStorage
        // ,debug: true
      });

      client.initQueryManager();

      this.setState({
        client,
        loaded: true
      });
    } catch (error) {
      console.error('Error mounting ApolloProviderWrapper', error);
    }
  }

  render() {
    const { client, loaded } = this.state;
    const { children } = this.props;

    if (!loaded) {
      return <div>Loading...</div>;
    }

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
}

export default ApolloProviderWrapper;
