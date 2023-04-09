import React from 'react'
import classes from "./Inbox.module.css";
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import MessageListItem from '../layout/MessageListItem';

export default function Inbox() {
    const inboxItems = useSelector(state => state.mail.recieved);
    // console.log(inboxItems);

    return (
        <React.Fragment>
            <h1 className={`text-center primaryColor ${classes.contentHeading}`}>Recieved Mails</h1>
            <Container className={`${classes.inbox}`}>
                <ul>
                    {inboxItems.map((item) => {
                        return <MessageListItem key={item.id} {...item} />
                    })}
                </ul>
            </Container>
        </React.Fragment>
    )
}
