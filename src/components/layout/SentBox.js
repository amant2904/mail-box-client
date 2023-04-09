import React from 'react'
import classes from "./SentBox.module.css"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux'

export default function SentBox() {
    const sentItems = useSelector(state => state.mail.sent);
    // console.log(sentItems);

    return (
        <React.Fragment>
            <h1 className={`text-center primaryColor ${classes.contentHeading}`}>Sent Mails</h1>
            <Container className={`${classes.inbox}`}>
                <ul>
                    {sentItems.map((item) => {
                        return <li key={item.id}>
                            <Container className={`${classes.listItem}`}>
                                <Row className={`${classes.listRow}`}>
                                    <Col className={`${classes.listItem_title}`} lg={9}>
                                        <h2>{item.title}</h2>
                                        <p>To :- {item.to}</p>
                                    </Col>
                                    <Col className={`${classes.listItem_btn} inboxBtn`} lg={3}>
                                        <Button className={`${classes.inboxOpen_btn}`}>Open</Button>
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
