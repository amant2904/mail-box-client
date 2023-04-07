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

    return (
        <React.Fragment>
            {showOverlay.isTrue && <Overlay message={showOverlay.message} onClick={overlayClose_handler} />}
            <Container fluid className={`${classes.authpage}`}>
                <h1 className={`${classes.logo} primaryColor`}>Mail Box Client</h1>
                <Row className={`${classes.formSection}`}>
                    <h2 className={`text-center primaryColor`}>Sign Up</h2>
                    <AuthForm overlay={overlay_handler} />
                </Row>
            </Container>
        </React.Fragment>
    )
}
