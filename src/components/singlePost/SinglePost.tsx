import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PostDto } from "../../../../twittermini-api/src/modules/posts/dtos/post.dto";
import Post, {
  CommentIconButton,
  LikeIconButton,
  PostImage
} from "../post/Post";
import "./singlePost.css";
import TwitterMiniAPI from "../../axios";
import { Loader, Grid, Row, Col, FlexboxGrid } from "rsuite";
import PostsRepository from "../../repositories/PostsRepository";
import { useAsync } from "../../hooks/useAsync";
export default function SinglePost() {
  const { id } = useParams();
  const { value: post, loading, status, error } = useAsync(() =>
    new PostsRepository(TwitterMiniAPI).getPost(Number(id))
  );
  return (
    <>
      <div className="single-post">
        {loading && <Loader />}
        {post && (
          <Grid fluid>
            <Row>
              <Col xs={2}>
                <img
                  src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                  style={{
                    width: "100%",
                    // height:30,
                    borderRadius: 9999
                  }}
                />
              </Col>
              <Col xs={18}>
                <Link to={"/user/" + post.author.handle}>
                  <div className="post-username">{post.author.name}</div>
                  <div className="post-handle">{"@" + post.author.handle}</div>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs={20}>
                <Row>
                  <div className="post-text">{post.text}</div>
                  {post.images != null
                    ? post.images.map(media => (
                        <Link to="/">
                          <PostImage
                            src={TwitterMiniAPI.getUri() + media.url}
                          />
                        </Link>
                      ))
                    : null}
                </Row>
                {
                  // <FlexboxGrid justify="space-between">
                  //   <FlexboxGrid.Item>
                  //     <CommentIconButton />
                  //   </FlexboxGrid.Item>
                  //   <FlexboxGrid.Item>
                  //     <LikeIconButton />
                  //   </FlexboxGrid.Item>
                  // </FlexboxGrid>
                }
              </Col>
            </Row>
          </Grid>
        )}
      </div>
    </>
  );
}
