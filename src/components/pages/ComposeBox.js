import React, { useState } from 'react'
import classes from "./ComposeBox.module.css";
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { mailActions } from '../../redux-store/mail-slice';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js"
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import LoadingSpinner from '../UI/LoadingSpinner';
import Overlay from '../layout/Overlay';

export default function ComposeBox() {
    const dispatch = useDispatch();
    const userEmail = useSelector(state => state.auth.user_email);
    const database_api = useSelector(state => state.ui.database_api);
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState({
        isTrue: false,
        message: ""
    })

    const overlayClose_handler = () => {
        setOverlay({
            isTrue: false,
            message: ""
        })
    }

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const updateTextDescription = (state) => {
        setEditorState(state);
    };

    const email_handler = (e) => {
        setEmail(e.target.value);
    }

    const title_handler = (e) => {
        setTitle(e.target.value);
    }

    const submit_handler = async (e) => {
        e.preventDefault();

        const reciever = email.split("").filter((i) => {
            return i !== "." && i !== "@"
        }).join("")

        const sender = userEmail.split("").filter((i) => {
            return i !== "." && i !== "@"
        }).join("")

        let message = convertToRaw(editorState.getCurrentContent());
        setLoading(true);
        try {
            const sender_res = await fetch(`${database_api}/${sender}/sent.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    to: email,
                    title: title,
                    message: JSON.stringify(message)
                })
            })
            const sender_data = await sender_res.json();
            // console.log(sender_data);
            if (!sender_res.ok) {
                throw new Error(sender_data.error.message);
            }

            const reciever_res = await fetch(`${database_api}/${reciever}/recieved.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    by: userEmail,
                    title: title,
                    message: JSON.stringify(message),
                    unread: true
                })
            })
            const reciever_data = await reciever_res.json();
            // console.log(reciever_data);
            if (!reciever_res.ok) {
                throw new Error(reciever_data.error.message);
            }
            dispatch(mailActions.sentMail_handler({
                to: email,
                title: title,
                message: JSON.stringify(message),
                id: sender_data.name
            }))
            setOverlay({
                isTrue: true,
                message: "Mail Sent Successfully"
            })
            setLoading(false);
        }
        catch (err) {
            setOverlay({
                isTrue: true,
                message: err.message
            })
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            {overlay.isTrue && <Overlay onClick={overlayClose_handler} message={overlay.message} />}
            <h1 className={`text-center primaryColor ${classes.contentHeading}`}>New Mail</h1>
            <Container className={`${classes.composeBox}`}>
                <Row className={`${classes.editor} flex-column align-items-center justify-content-center`}>
                    <Form className='p-0'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>To</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" value={email} onChange={email_handler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control as="textarea" rows={1} value={title} onChange={title_handler} />
                        </Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Editor
                            editorState={editorState}
                            toolbarClassName={classes.toolbar}
                            wrapperClassName={classes.wrapper}
                            editorClassName={classes.textEditor}
                            onEditorStateChange={updateTextDescription}
                        />
                        {!loading && <Button onClick={submit_handler} className={`primaryBg primaryBgHover my-3 mx-auto ${classes.sendBtn}`}>Send</Button>}
                        {loading && <LoadingSpinner size="60px" className={classes.loader} />}
                    </Form>
                </Row>
            </Container>
        </React.Fragment>
    )
}
