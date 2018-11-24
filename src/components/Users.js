import React, { Fragment } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const GET_USERS = gql`
    {
        allUsers(count: 25) {
            id
            firstName
            lastName
            avatar
        }
        selectedUser @client {
            id
            firstName
            lastName
            avatar
        }
    }
`;

const SELECT_USER = gql`
    mutation SelectUser($user: User!) {
        selectUser(user: $user) @client
    }
`;

const Users = () => {
    return (
        <div>
            <h2>Users</h2>

            <Query query={GET_USERS}>
                {({ loading, error, data: {allUsers, selectedUser} }) => {
                    if (loading) return <CircularProgress />;
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Fragment>
                            <p>{allUsers.length} users coming from <strong>fakerql.com</strong>.</p>
                            
                            {
                                selectedUser && <Card>
                                    <CardContent>
                                        <Avatar alt={`${selectedUser.firstName} ${selectedUser.lastName}`} src={selectedUser.avatar} />
                                        <Typography variant="h6" component="h2">
                                            {selectedUser.firstName} {selectedUser.lastName}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            }

                            <List dense>
                                {allUsers.map(user => {
                                    const { firstName, lastName, id } = user;
                                    return (
                                        <Mutation key={id} mutation={SELECT_USER} variables={{ user }}>
                                            {selectUser => (
                                                <ListItem key={id} button onClick={selectUser}>
                                                    {/* <Avatar alt={`${firstName} ${lastName}`} src={avatar} /> */}
                                                    <ListItemText primary={`${firstName} ${lastName}`} />
                                                </ListItem>
                                            )}
                                        </Mutation> 
                                    )
                                })}
                            </List>
                        </Fragment>
                    );
                }}
            </Query>

        </div>
    )
}

export default Users
