import React, { useState } from 'react'
import classes from "./ComposeBox.module.css";
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export default function ComposeBox() {
    const userEmail = useSelector(state => state.auth.user_email);
    const database_api = useSelector(state => state.ui.database_api);
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
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

        try {
            const sender_res = await fetch(`${database_api}/${sender}/sent.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    to: email,
                    title: title,
                    message: message
                })
            })
            const sender_data = await sender_res.json();
            console.log(sender_data);
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
                    message: message
                })
            })
            const reciever_data = await reciever_res.json();
            console.log(reciever_data);
            if (!reciever_res.ok) {
                throw new Error("not recieved");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
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
                    <Button onClick={submit_handler} className={`primaryBg primaryBgHover my-3 ${classes.sendBtn}`}>Send</Button>
                </Form>
            </Row>
        </Container>
    )
}
