import React, { useRef, useState } from "react";
import { Grid, Row, Col, Icon, FlexboxGrid, Button } from "rsuite";
import TweetButton from "../shared/tweetButton/TweetButton";
import "./newTweetForm.css";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { LoginDto } from "../../../../twittermini-api/src/modules/auth/dto/login.dto";
import { CreatePostDto } from "../../../../twittermini-api/src/modules/posts/dtos/add-post.dto";
import PostsRepository from "../../repositories/PostsRepository";
import TwitterMiniAPI from "../../axios";
import { useHistory } from "react-router-dom";
import MediaRepository from "../../repositories/MediaRepository";
type NewTweetFormStore = {
  images: File[];
  text: string;
};
const formStore = observable<NewTweetFormStore>({
  text: "",
  images: []
});
function NewTweetForm() {
  const history = useHistory();
  const imageInputRef = useRef<HTMLInputElement>(null);
  return (
    <Grid fluid className="tweet-form">
      <Row>
        <Col xs={4} sm={3}>
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
            <Col>
              <input
                maxLength={140}
                placeholder="What's happening?"
                value={formStore.text}
                onChange={e => {
                  formStore.text = e.target.value;
                }}
              />
              <FlexboxGrid>
                {formStore.images.map(image => {
                  const src = URL.createObjectURL(image);
                  return (
                    <FlexboxGrid.Item>
                      <img src={src} width="50" />
                    </FlexboxGrid.Item>
                  );
                })}
              </FlexboxGrid>
              <input
                type="file"
                id="imgupload"
                accept="image/*"
                ref={imageInputRef}
                multiple
                style={{ display: "none" }}
                onInput={e => {
                  if (imageInputRef.current) {
                    if (imageInputRef.current.files) {
                      console.log("aaa");
                      formStore.images = Array.from(
                        imageInputRef.current.files
                      );
                    }
                  }
                }}
              />
            </Col>
            <Col>
              <FlexboxGrid justify="space-between" align="middle">
                <FlexboxGrid.Item>
                  <ImageButton />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <TweetButton
                    onClick={() => {
                      submitForm();
                    }}
                    style={{
                      fontSize: 13,
                      minHeight: 35
                    }}
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  );

  async function submitForm() {
    if (formStore.text.length > 0 && formStore.text.length < 140) {
      const imageIds: Array<number> = [];
      const mediaRepository = new MediaRepository(TwitterMiniAPI);
      await Promise.all(
        formStore.images.map(async image => {
          const id = await mediaRepository.uploadImage(image);
          imageIds.push(id);
        })
      );
      const createPostDto: CreatePostDto = {
        text: formStore.text,
        images: imageIds,
        replyingToPostId: undefined
      };
      const postsRepository = new PostsRepository(TwitterMiniAPI);
      const postId = await postsRepository.createPost(createPostDto);
      history.push("/post/" + postId);
    } else {
      alert("no");
    }
  }

  function uploadImage() {
    imageInputRef.current?.click();
  }

  function ImageButton() {
    return (
      <a
        href="#"
        className="add-media"
        onClick={e => {
          e.preventDefault();
          uploadImage();
        }}
      >
        <svg
          viewBox="0 0 24 24"
          style={{
            width: 24,
            height: 24,
            fill: "rgb(29, 161, 242)"
          }}
        >
          <g>
            <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
            <circle cx="8.868" cy="8.309" r="1.542"></circle>
          </g>
        </svg>
      </a>
    );
  }
}

export default observer(NewTweetForm);
