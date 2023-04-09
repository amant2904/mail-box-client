import React from 'react'
import classes from "./SentBox.module.css"
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import MessageListItem from '../layout/MessageListItem';

export default function SentBox() {
    const sentItems = useSelector(state => state.mail.sent);
    // console.log(sentItems);

    return (
        <React.Fragment>
            <h1 className={`text-center primaryColor ${classes.contentHeading}`}>Sent Mails</h1>
            <Container className={`${classes.inbox}`}>
                <ul>
                    {sentItems.map((item) => {
                        let obj = {
                            ...item,
                            sent: true
                        }
                        return <MessageListItem key={item.id} {...obj} />
                    })}
                </ul>
            </Container>
        </React.Fragment>
    )
}
