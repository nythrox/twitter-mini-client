import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostDto } from "../../../../twittermini-api/src/modules/posts/dtos/post.dto";
import PostsRepository from "../../repositories/PostsRepository";
import TwitterMiniAPI from "../../axios";
import Post from "../post/Post";
import { Loader, Grid, FlexboxGrid } from "rsuite";
import { UserDto } from "../../../../twittermini-api/src/modules/users/dtos/user.dto";
import UserRepository from "../../repositories/UserRepository";
import TweetSeperator from "../tweetSeperator/TweetSeperator";
import { useAsync, useAsyncAfter, PromiseCallback } from "../../hooks/useAsync";

export default function Profile() {
  const { handle } = useParams();
  const {
    value: user,
    promise: userPromise,
    loading: userLoading,
    error: userError
  } = useAsync(() =>{
    return new UserRepository(TwitterMiniAPI).getUserByHandle(String(handle))
  });
  const { value: posts, loading, error, promise } = useAsyncAfter(
    userPromise,
    user => {
      return new PostsRepository(TwitterMiniAPI).getPostsFromUser(user.id);
    }
  );
  // const {value, promise: pr} = useAsyncAfter(promise, async (posts)=>{
  //   console.log(posts)
  // })
  // const {value: ho} = useAsyncAfter(pr, async (posts)=>{
  //   console.log("he")
  // })
  console.log("RELODED");
  console.log("______");
  return (
    <>
      <div
        style={{
          borderRight: "1px solid rgb(56, 68, 77)",
          minHeight: "100vh"
        }}
      >
        <FlexboxGrid align="middle">
          <FlexboxGrid.Item>
            {userError && userError.status}
            {userLoading && <Loader />}
            {user && <h1 style={{ color: "white" }}>{user.name}</h1>}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            {user && (
              <h4 style={{ marginLeft: 10, color: "white" }}>{user.handle}</h4>
            )}
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <TweetSeperator />
        {loading && loading}
        {error && error.status}
        {posts &&
          posts.map((post, i) => (
            <Post
              key={i}
              id={post.id}
              name={post.author.name}
              content={post.text}
              handle={post.author.handle}
              images={post.images.map(
                image => TwitterMiniAPI.getUri() + image.url
              )}
            />
          ))}
      </div>
    </>
  );
}
