import gql from 'graphql-tag';

export const GET_MESSAGES = gql`
    {
        messages {
            id
            text
        }
    }
`;