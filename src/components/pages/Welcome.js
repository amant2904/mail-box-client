import React, { useEffect } from 'react'
import classes from "./Welcome.module.css";
import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from '../layout/Sidebar';
import ComposeBox from '../layout/ComposeBox';
import { useSelector, useDispatch } from 'react-redux';
import Inbox from '../layout/Inbox';
import { mailActions } from '../../redux-store/mail-slice';
import SentBox from '../layout/SentBox';

export default function Welcome() {
    const content = useSelector(state => state.ui.content);
    const database_api = useSelector(state => state.ui.database_api);
    const userEmail = useSelector(state => state.auth.user_email);
    const dispatch = useDispatch();

    let contentHeading = "Recieved Mails";
    let contentLayout = <Inbox />

    if (content === "sent") {
        contentHeading = "Sent Mails";
        contentLayout = <SentBox />;
    }
    else if (content === "compose") {
        contentHeading = "New Mail";
        contentLayout = <ComposeBox />;
    }

    useEffect(() => {
        const firstFetch = async () => {
            const email = userEmail.split("").filter((i) => {
                return i !== "." && i !== "@";
            }).join("");
            try {
                const res = await fetch(`${database_api}/${email}.json`);
                const data = await res.json();
                // console.log(data);
                if (!res.ok) {
                    throw new Error(data.error.message);
                }
                dispatch(mailActions.firstFetch(data))
            }
            catch (err) {
                console.log(err.message);
            }
        }
        firstFetch();
    }, [database_api, userEmail, dispatch])

    return (
        <React.Fragment>
            <Container fluid>
                <Row className={`${classes.welcome}`}>
                    <Col lg={2} className={`m-0 p-0 ${classes.sidebar}`}>
                        <Sidebar />
                    </Col>
                    <Col lg={10}>
                        <h1 className={`text-center primaryColor ${classes.contentHeading}`}>{contentHeading}</h1>
                        {contentLayout}
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
