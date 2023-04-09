import React from 'react'
import classes from "./MessageListItem.module.css"
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { mailActions } from '../../redux-store/mail-slice'

export default function MessageListItem(item) {
    const dispatch = useDispatch();
    const user_email = useSelector(state => state.auth.user_email);
    const database_api = useSelector(state => state.ui.database_api);
    const deleteMail_handler = async () => {
        const userEmail = user_email.split("").filter((i) => {
            return i !== "@" && i !== "."
        }).join("");
        try {
            const res = await fetch(`${database_api}/${userEmail}/${(item.sent) ? "sent" : "recieved"}/${item.id}.json`, {
                method: "DELETE"
            });
            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                throw new Error("unable to delete")
            }
            if (item.sent) {
                dispatch(mailActions.deleteSent(item.id));
            }
            else {
                dispatch(mailActions.deleteRecieved(item.id));
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <li key={item.id}>
            <Container className={`${classes.listItem}`}>
                <Row className={`${classes.listRow}`}>
                    <Col className={`${classes.listItem_title}`} lg={9}>
                        <h2>{item.title} {(item.unread) && <span>New</span>}</h2>
                        <p>{(item.sent) ? "To" : "By"} :- {(item.sent) ? item.to : item.by}</p>
                    </Col>
                    <Col className={`${classes.listItem_btn} inboxBtn`} lg={3}>
                        <Link to={`/${(item.sent) ? "sent" : "recieved"}/${item.title}`} state={item} className={`${classes.inboxOpen_btn}`}>Open</Link>
                        <Button className={`${classes.inboxDelete_btn}`} onClick={deleteMail_handler}>Delete</Button>
                        <p hidden>{item.id}</p>
                    </Col>
                </Row>
            </Container>
        </li>
    )
}
