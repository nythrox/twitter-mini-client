import { useEffect, useState, useCallback } from "react";
import PostsRepository from "../repositories/PostsRepository";
import TwitterMiniAPI from "../axios";
import { PostDto } from "../../../twittermini-api/src/modules/posts/dtos/post.dto";
export const usePosts = () => {
  const [posts, setPosts] = useState<PostDto[] | void>();
  const [error, setError] = useState();
  const postsRepository = new PostsRepository(TwitterMiniAPI);
  postsRepository
    .getAllPosts()
    .catch(e => {
      setError(e);
    })
    .then(posts => {
      setPosts(posts);
    });
  return {
    error,
    posts
  };
};

