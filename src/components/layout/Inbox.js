import React from 'react'
import classes from "./Inbox.module.css";
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Inbox() {
    const inboxItems = useSelector(state => state.mail.recieved);

    return (
        <React.Fragment>
            <h1 className={`text-center primaryColor ${classes.contentHeading}`}>Recieved Mails</h1>
            <Container className={`${classes.inbox}`}>
                <ul>
                    {inboxItems.map((item) => {
                        return <li key={item.id}>
                            <Container className={`${classes.listItem}`}>
                                <Row className={`${classes.listRow}`}>
                                    <Col className={`${classes.listItem_title}`} lg={9}>
                                        <h2>{item.title}</h2>
                                        <p>By :- {item.by}</p>
                                    </Col>
                                    <Col className={`${classes.listItem_btn} inboxBtn`} lg={3}>
                                        <Link to={`/${item.title}`} state={item} className={`${classes.inboxOpen_btn}`}>Open</Link>
                                        <Button className={`${classes.inboxDelete_btn}`}>Delete</Button>
                                        <p hidden>{item.id}</p>
                                    </Col>
                                </Row>
                            </Container>
                        </li>
                    })}
                </ul>
            </Container>
        </React.Fragment>
    )
}
