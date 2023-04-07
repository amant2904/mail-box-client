import React from 'react'
import ReactDOM from "react-dom"
import classes from "./Overlay.module.css"
import { Container, Button } from 'react-bootstrap'

const OverlayBox = (props) => {
    return (
        <Container fluid className={`${classes.overlayBox}`}>
            <div>
                <h1 className='mt-5 text-center fs-1'>{props.message}</h1>
                <Button className={`primaryBg`} onClick={props.onClick}>Close</Button>
            </div>
        </Container>
    )
}

export default function overLay(props) {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<OverlayBox message={props.message} onClick={props.onClick} />, document.getElementById("overlay"))}
        </React.Fragment>
    )
}
