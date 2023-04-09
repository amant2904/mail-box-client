import React from 'react'
import classes from "./Sidebar.module.css";
import { Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from "../../redux-store/ui-slice"
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const dispatch = useDispatch();

    const composeMail_handler = () => {
        dispatch(uiActions.changeContent("compose"));
    }

    const sentMail_handler = () => {
        dispatch(uiActions.changeContent("sent"));
    }

    const recieveMail_handler = () => {
        dispatch(uiActions.changeContent("recieved"));
    }

    const unread = useSelector(state => state.mail.unread);

    return (
        <React.Fragment>
            <div className={`${classes.sidebarBox}`}>
                <div>
                    <Link to="/new-mail" className={`primaryBg primaryBgHover ${classes.composeBtn}`} onClick={composeMail_handler}>Compose Mail</Link>
                    <Link to="/" className={`${classes.sidebarBtn} bg-primary`} >Recieved {(unread > 0) && <span>{unread}</span>}</Link>
                    <Link to="/sent" className={`${classes.sidebarBtn} bg-primary`} >Sent</Link>
                    <Button className={`${classes.sidebarBtn} bg-primary`} disabled>Span</Button>
                    <Button className={`${classes.sidebarBtn} bg-primary`} disabled>Draft</Button>
                </div>
                <div className={`${classes.sidebarText}`}>
                    <p className={`text-center`}>Service Provided By XYZ Technologies</p>
                    <p className={`text-center mt-0`}>100% Free to Use</p>
                </div>
            </div>
        </React.Fragment>
    )
}
