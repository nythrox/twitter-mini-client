import { Grid, Row, Col, Button } from "rsuite";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Redirect,
  Switch
} from "react-router-dom";
import Post from "../post/Post";
import Profile from "../profile/Profile";
import Home from "../home/Home";
import SinglePost from "../singlePost/SinglePost";
import Sidebar from "../sidebar/Sidebar";
import { AppContext } from "../../stores/AppStore";
import { Login } from "../login/Login";
import { useObserver } from "mobx-react";
import { Register } from "../register/Register";

export default function AppRouter() {
  const appStore = useContext(AppContext);
  return useObserver(() => (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {appStore.user ? (
          <Grid fluid>
            <Row gutter={0}>
              <Col xsHidden smHidden mdHidden lg={6}>
                <Sidebar />
              </Col>
              <Col lg={10}>
                <Route path="/" exact component={Home} />
                <Route path="/user/:handle" component={Profile} />
                <Route path="/post/:id" component={SinglePost} />
              </Col>
            </Row>
          </Grid>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </BrowserRouter>
  ));
}
