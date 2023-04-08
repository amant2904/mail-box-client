import React from 'react'
import classes from "./Header.module.css";
import { Row, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux-store/auth-slice';
import { mailActions } from '../../redux-store/mail-slice';

export default function Header() {

    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
        localStorage.removeItem("tokenId");
        localStorage.removeItem("user_email");
        dispatch(mailActions.clearMail())
    }

    return (
        <Container fluid className={`${classes.nav}`}>
            <Row className={`${classes.header} primaryBg`}>
                <h1>Mail Box</h1>
                <Button onClick={logoutHandler}>Logout</Button>
            </Row>
        </Container>
    )
}
