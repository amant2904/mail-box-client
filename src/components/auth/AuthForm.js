import React, { useEffect, useRef, useState } from 'react'
import classes from "./AuthForm.module.css"
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner';
import { authActions } from '../../redux-store/auth-slice';


export default function AuthForm(props) {
    const { isLogin } = props;

    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const api_key = useSelector(state => state.auth.api_key);
    // const api_key = "dfnldkf"

    const auth_handler = async () => {
        if (email.current.value.includes("@") === false) {
            props.overlay({ message: "Please Enter Valid Email Address" });
            return;
        }
        else if (password.current.value.length < 7) {
            props.overlay({ message: "Password Must Be At Least 7 Characters Long" });
            return;
        }

        if (isLogin) {
            setLoading(true);
            try {
                const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        email: email.current.value,
                        password: password.current.value,
                        returnSecureToken: true
                    })
                })
                const data = await res.json();
                // console.log(data);s
                if (!res.ok) {
                    throw new Error(data.error.message);
                }
                dispatch(authActions.login({ tokenId: data.idToken, email: data.email, fullName: data.displayName }));
                localStorage.setItem("tokenId", data.idToken);
                localStorage.setItem("user_email", data.email);
                setLoading(false);
            }
            catch (err) {
                setLoading(false);
                props.overlay({ message: err.message })
            }
        }
        else {
            if (password.current.value !== confirmPassword.current.value) {
                props.overlay({ message: "Password and Confirm Password Didn't Match" });
                return;
            }
            setLoading(true);
            try {
                const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`, {
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
                const data = await res.json();
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

    }

    useEffect(() => {
        const tokenId = localStorage.getItem("tokenId");
        // console.log(1);
        const check_login = async () => {
            try {
                const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_key}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        idToken: tokenId
                    })
                })
                const data = await res.json();
                // console.log(data);
                if (!res.ok) {
                    throw new Error(data.error.message);
                }
                if (localStorage.getItem("user_email") !== data.users[0].email) {
                    throw new Error("unable to login");
                }
                dispatch(authActions.login({ tokenId: tokenId, email: data.users[0].email, fullName: data.users[0].displayName }))
            }
            catch (err) {
                localStorage.removeItem("tokenId");
                localStorage.removeItem("user_email");
                dispatch(authActions.logout());
            }
        }
        if (tokenId) {
            check_login();
        }
    }, [api_key, dispatch])

    return (
        <Form className={`${classes.authForm} shadow-lg primaryColor`}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" ref={password} />
            </Form.Group>
            {!isLogin && <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password Again" ref={confirmPassword} />
            </Form.Group>}
            {!loading && <Button className={`d-block m-auto ${classes.loginBtn} primaryBg primaryBgHover`} onClick={auth_handler}>{(isLogin) ? "Login" : "Sign Up"}</Button>}
            {loading && <LoadingSpinner size="50px" />}
        </Form>
    )
}
