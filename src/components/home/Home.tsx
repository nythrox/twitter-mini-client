import React, { useState, useEffect } from "react";
import TweetSeperator from "../tweetSeperator/TweetSeperator";
import Post from "../post/Post";
import { Loader } from "rsuite";
import Navbar from "../navbar/Navbar";
import { PostDto } from "../../../../twittermini-api/src/modules/posts/dtos/post.dto";
import PostsRepository from "../../repositories/PostsRepository";
import TwitterMiniAPI from "../../axios";
import NewTweetForm from "../newTweetForm/NewTweetForm";
import { useAsync } from "../../hooks/useAsync";
export default function Home() {
  const { value: posts, status, error, loading } = useAsync(
    new PostsRepository(TwitterMiniAPI).getAllPosts()
  );
  return (
    <>
      <div
        style={{
          borderRight: "1px solid rgb(56, 68, 77)",
          minHeight: "100vh"
        }}
      >
        <Navbar />
        <NewTweetForm />
        <TweetSeperator />
        {loading && <Loader />}
        {error ? console.log(error) : null}
        {error && error.status}
        {posts &&
          posts.map((post, i) => (
            <Post
              id={post.id}
              key={i}
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
