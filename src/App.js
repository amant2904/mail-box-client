import React, { useEffect } from 'react';
import Authentication from './components/pages/Authentication';
import { useSelector, useDispatch } from 'react-redux';
import { mailActions } from './redux-store/mail-slice';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import classes from "./App.module.css"
import Inbox from "./components/pages/Inbox"
import SentBox from "./components/pages/SentBox"
import ComposeBox from "./components/pages/ComposeBox"
import MailReader from './components/layout/MailReader';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const database_api = useSelector(state => state.ui.database_api);
  const userEmail = useSelector(state => state.auth.user_email);
  const dispatch = useDispatch();

  useEffect(() => {
    const firstFetch = async () => {
      const email = userEmail.split("").filter((i) => {
        return i !== "." && i !== "@";
      }).join("");
      try {
        const res = await fetch(`${database_api}/${email}.json`);
        const data = await res.json();
        // console.log(data);
        if (!res.ok) {
          throw new Error(data.error.message);
        }
        dispatch(mailActions.firstFetch(data))
      }
      catch (err) {
        console.log(err.message);
      }
    }
    firstFetch()
  }, [database_api, userEmail, dispatch])

  return (
    <React.Fragment>
      {isLoggedIn && <Header />}
      <Container fluid>
        <Row className={`${classes.ui}`}>
          {isLoggedIn && <Col lg={2} className={`m-0 p-0 ${classes.sidebar}`}>
            <Sidebar />
          </Col>}
          <Col lg={(isLoggedIn) ? "10" : "12"} className={`${(isLoggedIn) ? '' : 'p-0 m-0'}`}>
            <Routes>
              {!isLoggedIn && <Route path="/" element={<Authentication />} />}
              {isLoggedIn && <Route path="/" element={<Inbox />} />}
              {isLoggedIn && <Route path="/sent" element={<SentBox />} />}
              {isLoggedIn && <Route path="/new-mail" element={<ComposeBox />} />}
              {isLoggedIn && <Route path='/:mode/:id' element={<MailReader />} />}
            </Routes>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
