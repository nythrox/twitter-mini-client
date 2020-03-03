import React from "react";
import { Grid, Col } from "rsuite";
import TweetButton from "../shared/tweetButton/TweetButton";
import SidebarLink from "../shared/sidebarLink/SidebarLink";
export default function Sidebar() {
  return (
    <Grid
      fluid
      style={{
        padding: "0px 40px 20px 40px",
        borderRight: "1px solid rgb(56, 68, 77)",
        height: "100vh",
        width: "24.66666666666%",
        position: "fixed"
      }}
    >
      <Col>
        <SidebarLink text="Home" icon="home" />
      </Col>
      <Col>
        <SidebarLink text="Explore" icon="hashtag" />
      </Col>
      <Col>
        <SidebarLink to="/profile" text="Profile" icon="profile" />
      </Col>
      <Col>
        <TweetButton />
      </Col>
    </Grid>
  );
}
