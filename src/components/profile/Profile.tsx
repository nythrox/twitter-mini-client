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
export default function Profile() {
  const { handle } = useParams();
  const [user, setUser] = useState<UserDto>();
  const [posts, setPosts] = useState<PostDto[]>();
  useEffect(() => {
    if (!user) {
      const userRepository = new UserRepository(TwitterMiniAPI);
      userRepository.getUserByHandle(String(handle)).then(user => {
        setUser(user);
        console.log(user);
        const postsRepository = new PostsRepository(TwitterMiniAPI);
        postsRepository.getPostsFromUser(Number(user.id)).then(posts => {
          setPosts(posts);
          console.log(posts);
        });
      });
    }
  }, []);
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
            {user ? (
              <h1 style={{ color: "white" }}>{user.name}</h1>
            ) : (
              <Loader />
            )}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            {user ? (
              <h4 style={{ marginLeft: 10, color: "white" }}>{user.handle}</h4>
            ) : (
              <Loader />
            )}
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <TweetSeperator />
        {posts ? (
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
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
