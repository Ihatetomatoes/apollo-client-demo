import React, {Fragment} from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CommentIcon from '@material-ui/icons/Comment';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const GET_MESSAGES_LOCAL = gql`
    {
        messages @client {
            id
            text
        }
        selectedUser @client {
            id
            firstName
            lastName
            avatar
        }
    }
`;


const Home = () => {
    return (
        <div>
            <h2>Home</h2>
            
            <Query query={GET_MESSAGES_LOCAL}>
                {({ loading, error, data: {messages, selectedUser} }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Fragment>
                            <p>{messages.length} messages coming from a <strong>local Apollo state</strong>.</p>
                            <List>
                                {messages.map(message => (
                                    <ListItem key={message.id} role={undefined} dense button>
                                        <CommentIcon />
                                        <ListItemText primary={message.text} />
                                    </ListItem>
                                ))}
                            </List>
                            {
                                selectedUser && 
                                <Fragment>
                                    <p>Selected User:</p>
                                    <Card>
                                        <CardContent>
                                            <Avatar alt={`${selectedUser.firstName} ${selectedUser.lastName}`} src={selectedUser.avatar} />
                                            <Typography variant="h6" component="h2">
                                                {selectedUser.firstName} {selectedUser.lastName}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Fragment>
                            }
                        </Fragment>
                    );
                }}
            </Query>
            
        </div>
    )
}

export default Home
