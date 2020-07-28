import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const env = window.location.host.includes('localhost:') ? 'local' : 'prod';
const blocktapGraphQlUrl = 'https://api.blocktap.io/graphql'

const httpLink = new HttpLink({
    uri: blocktapGraphQlUrl,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: httpLink,
    cache,
});

export default client;
