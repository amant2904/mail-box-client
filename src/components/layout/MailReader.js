import React, { useEffect, useState } from 'react'
import classes from "./MailReader.module.css"
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { useSelector, useDispatch } from 'react-redux';
import { mailActions } from '../../redux-store/mail-slice';

export default function MailReader() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)

    const message = location.state.message;

    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(convertFromRaw(JSON.parse(message)))
    );

    const goBack_handler = () => {
        if (params.mode === "recieved") {
            navigate("/")
        }
        else {
            navigate(`/${params.mode}`)
        }
    }

    const user_email = useSelector(state => state.auth.user_email);
    const database_api = useSelector(state => state.ui.database_api);
    const dispatch = useDispatch();
    useEffect(() => {
        const unread_false = async () => {
            const userEmail = user_email.split("").filter((i) => {
                return i !== "@" && i !== "."
            }).join("");
            try {
                const res = await fetch(`${database_api}/${userEmail}/recieved/${location.state.id}.json`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        by: location.state.by,
                        title: location.state.title,
                        message: location.state.message,
                        unread: false
                    })
                })
                const data = await res.json();
                console.log(data);
                if (!res.ok) {
                    throw new Error("unable to update unread in database");
                }
                dispatch(mailActions.unreadfalse(location.state.id))
            }
            catch (err) {
                console.log(err.message);
            }
        }
        if (location.state.unread) {
            unread_false()
        }
    }, [])

    return (
        <React.Fragment>
            <Container className={`${classes.mailReader}`}>
                <Row className={`align-items-center justify-content-between mx-3`}>
                    <Col lg={2}>
                        <Button className={`${classes.backBtn}`} onClick={goBack_handler}>{"<- Back"}</Button>
                    </Col>
                    <Col lg={6} className={`${classes.oppositeEmail} primaryBg`}>
                        <p className={`text-center m-0`}>{(params.mode === "recieved") ? "Send By :- " : "Sent To :- "} {(params.mode === "recieved") ? location.state.by : location.state.to}</p>
                    </Col>
                </Row>

                <h2 className={`${classes.title} shadow-sm`}>{location.state.title}</h2>

                <Editor
                    editorState={editorState}
                    toolbarClassName={classes.toolbar}
                    wrapperClassName={classes.wrapper}
                    editorClassName={classes.textEditor}
                />
            </Container>
        </React.Fragment>
    )
}
