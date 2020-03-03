import React from "react";
import "./post.css";
import { Grid, Row, Col, Icon, FlexboxGrid, Button } from "rsuite";
import { Link } from "react-router-dom";
export type PostProps = {
  id: number
  name: string;
  content: string;
  handle: string;
  images?: string[];
};

export default function Post({ name, content, handle, images, id }: PostProps) {
  return (
    <div className="post">
      <Link to={"/post/"+id}>
        <Grid fluid>
          <Row>
            <Col xs={4} sm={2}>
              <img
                src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                style={{
                  width: "100%",
                  // height:30,
                  borderRadius: 9999
                }}
              />
            </Col>
            <Col xs={18} sm={20}>
              <Row>
                <FlexboxGrid>
                  <FlexboxGrid.Item>
                    <div className="post-username">{name}</div>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item>
                    <div className="post-handle">{"@" + handle}</div>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
                <div className="post-text">{content}</div>
                {images != null
                  ? images.map((src, i) => (
                      <Link to="/">
                        <PostImage src={src} key={i} />
                      </Link>
                    ))
                  : null}
              </Row>
              <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item>
                  <CommentIconButton />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <LikeIconButton />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Col>
          </Row>
        </Grid>
      </Link>
    </div>
  );
}
type PostImageProps = {
  src: string;
};
export function PostImage({ src }: PostImageProps) {
  return (
    <img
      src={src}
      style={{
        maxWidth: "100%",
        borderRadius: 15,
        border: "1px solid rgb(56, 68, 77)",
        marginTop: 10
      }}
    />
  );
}

export function CommentIconButton() {
  return (
      <svg
        viewBox="0 0 24 24"
        style={{
          width: 24,
          height: 24,
          fill: "rgb(29, 161, 242)"
        }}
      >
        <g>
          <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
        </g>
      </svg>
  );
}

export function LikeIconButton() {
  return (
      <svg
        viewBox="0 0 24 24"
        style={{
          width: 24,
          height: 24,
          fill: "rgb(29, 161, 242)"
        }}
      >
        <g>
          <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
        </g>
      </svg>
  );
}
