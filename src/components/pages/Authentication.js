import React, { useState } from 'react'
import classes from "./Authentication.module.css"
import { Container, Row } from 'react-bootstrap'
import AuthForm from '../auth/AuthForm'
import Overlay from "../layout/Overlay"

export default function Authentication() {
    const [showOverlay, setShowOverlay] = useState({
        isTrue: false,
        message: ""
    });
    const [login, setLogin] = useState(true);

    const overlayClose_handler = () => {
        setShowOverlay({
            isTrue: false,
            message: ""
        })
    }

    const overlay_handler = (status) => {
        if (status) {
            setShowOverlay({
                isTrue: true,
                message: status.message
            })
        }
    }

    const authSwitch_handler = () => {
        setLogin(prv => !prv);
    }

    return (
        <React.Fragment>
            {showOverlay.isTrue && <Overlay message={showOverlay.message} onClick={overlayClose_handler} />}
            <Container fluid className={`${classes.authpage}`}>
                <h1 className={`${classes.logo} primaryColor`}>Mail Box Client</h1>
                <Row className={`${classes.formSection}`}>
                    <h2 className={`text-center primaryColor`}>{(login) ? "Login" : "Sign Up"}</h2>
                    <AuthForm overlay={overlay_handler} isLogin={login} />
                    <button className={`${classes.switchAuth_btn} primaryBg`} onClick={authSwitch_handler}>{(login) ? "Don't Have An Account? Sign Up" : "Have An Account? Login"}</button>
                </Row>
            </Container>
        </React.Fragment>
    )
}
