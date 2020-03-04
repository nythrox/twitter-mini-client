import React, { useContext } from "react";
import { Grid, Col } from "rsuite";
import TweetButton from "../shared/tweetButton/TweetButton";
import SidebarLink from "../shared/sidebarLink/SidebarLink";
import { AppContext } from "../../stores/AppStore";
export default function Sidebar() {
  const appStore = useContext(AppContext);
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
        <SidebarLink to="/" text="Home" icon="home" />
      </Col>
      <Col>
        <SidebarLink text="Logout" icon="hashtag" onClick={appStore.logout} />
      </Col>
      <Col>
        <SidebarLink
          to={"/user/" + appStore.user?.handle}
          text="Profile"
          icon="profile"
        />
      </Col>
      {
        // <Col>
        //   <TweetButton />
        // </Col>
      }
    </Grid>
  );
}
