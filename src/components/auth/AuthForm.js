import React, { useRef, useState } from 'react'
import classes from "./AuthForm.module.css"
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner';

export default function AuthForm(props) {
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const [loading, setLoading] = useState(false);

    const api_key = useSelector(state => state.auth.api_key);
    // const api_key = "dfnldkf"

    const auth_handler = async () => {
        if (password.current.value !== confirmPassword.current.value) {
            props.overlay({ message: "Password and Confirm Password Didn't Match" });
            return;
        }
        else if (password.current.value.length < 7) {
            props.overlay({ message: "Password Must Be At Least 7 Characters Long" });
            return;
        }
        else if (email.current.value.includes("@") === false) {
            props.overlay({ message: "Please Enter Valid Email Address" });
            return;
        }

        setLoading(true);
        try {
            let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    email: email.current.value,
                    password: password.current.value,
                    returnSecureToken: true
                })
            });
            let data = await res.json();
            if (!res.ok) {
                throw new Error(data.error.message);
            }
            props.overlay({ message: "User Signed Up Successfully!" })
            setLoading(false);
        }
        catch (err) {
            props.overlay({ message: err.message })
            setLoading(false);
        }
    }

    return (
        <Form className={`${classes.authForm} shadow-lg`}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" ref={password} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password Again" ref={confirmPassword} />
            </Form.Group>
            {!loading && <Button className={`d-block m-auto ${classes.loginBtn} primaryBg`} onClick={auth_handler}>Sign Up</Button>}
            {loading && <LoadingSpinner size="50px" />}
        </Form>
    )
}
