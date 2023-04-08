import React from 'react'
import classes from "./Sidebar.module.css";
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { uiActions } from "../../redux-store/ui-slice"

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

    return (
        <React.Fragment>
            <div className={`${classes.sidebarBox}`}>
                <div>
                    <Button className={`primaryBg primaryBgHover ${classes.composeBtn}`} onClick={composeMail_handler}>Compose Mail</Button>
                    <Button className={`${classes.sidebarBtn}`} onClick={sentMail_handler}>Sent</Button>
                    <Button className={`${classes.sidebarBtn}`} onClick={recieveMail_handler}>Recieved</Button>
                    <Button className={`${classes.sidebarBtn}`} disabled>Span</Button>
                    <Button className={`${classes.sidebarBtn}`} disabled>Draft</Button>
                </div>
                <div className={`${classes.sidebarText}`}>
                    <p className={`text-center`}>Service Provided By XYZ Technologies</p>
                    <p className={`text-center mt-0`}>100% Free to Use</p>
                </div>
            </div>
        </React.Fragment>
    )
}
