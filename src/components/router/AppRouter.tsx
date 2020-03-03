import { Grid, Row, Col, Button } from "rsuite";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import Post from "../post/Post";
import Profile from "../profile/Profile";
import Home from "../home/Home";
import SinglePost from "../singlePost/SinglePost";
import Sidebar from "../sidebar/Sidebar";
import { AppContext } from "../../stores/AppStore";

export default function AppRouter() {
  const appStore = useContext(AppContext);
  return (
    <BrowserRouter>
      <Grid fluid>
        <Row gutter={0}>
          <Col xsHidden smHidden mdHidden lg={6}>
            <Sidebar />
          </Col>
          <Col lg={10}>
            {appStore.user ? (
              <Route path="/" exact component={Home} />
            ) : (
              "login now"
            )}
            <Route path="/user/:handle" component={Profile} />
            <Route path="/post/:id" component={SinglePost} />
          </Col>
        </Row>
      </Grid>
    </BrowserRouter>
  );
}
