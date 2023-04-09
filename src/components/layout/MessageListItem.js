import React from 'react'
import classes from "./MessageListItem.module.css"
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function MessageListItem(item) {
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
                        <Button className={`${classes.inboxDelete_btn}`}>Delete</Button>
                        <p hidden>{item.id}</p>
                    </Col>
                </Row>
            </Container>
        </li>
    )
}
