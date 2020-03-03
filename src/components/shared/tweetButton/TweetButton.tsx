import React, { CSSProperties } from "react";
import { Grid, Col } from "rsuite";
import "./tweetButton.css";
import { Link } from "react-router-dom";
export default function TweetButton({ onClick, to, style }: TweetButtonProps) {
  return (
    <Link to={to || ""} onClick={e => onClick ? onClick() : null}>
      <div className="tweet-button" style={style}>
        Tweet
      </div>
    </Link>
  );
}

export type TweetButtonProps = {
  onClick?: Function;
  to?: string;
  style?: CSSProperties;
};
