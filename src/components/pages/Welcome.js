import React from 'react'
import classes from "./Welcome.module.css";
import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from '../layout/Sidebar';
import ComposeBox from '../layout/ComposeBox';
import { useSelector } from 'react-redux';

export default function Welcome() {
    const content = useSelector(state => state.ui.content);

    let contentHeading = "Recieved Mails";

    if (content === "sent") {
        contentHeading = "Sent Mails";
    }
    else if (content === "compose") {
        contentHeading = "New Message";
    }

    return (
        <React.Fragment>
            <Container fluid>
                <Row className={`${classes.welcome}`}>
                    <Col lg={2} className={`m-0 p-0 ${classes.sidebar}`}>
                        <Sidebar />
                    </Col>
                    <Col lg={10}>
                        <h1 className={`text-center primaryColor ${classes.contentHeading}`}>{contentHeading}</h1>
                        <ComposeBox />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
