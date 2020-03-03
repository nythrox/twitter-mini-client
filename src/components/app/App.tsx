import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "../../assets/logo.svg";
import AppRouter from "../router/AppRouter";

import "rsuite/dist/styles/rsuite-default.min.css";
import PostsRepository from "../../repositories/PostsRepository";
import TwitterMiniAPI from "../../axios";
import { PostDto } from "../../../../twittermini-api/src/modules/posts/dtos/post.dto";
import { AppContext, AppStoreInstance } from "../../stores/AppStore";
function App() {
  return (
    <AppContext.Provider value={AppStoreInstance}>
      <div className="App">
        <AppRouter />
      </div>
    </AppContext.Provider>
  );
}

export default App;
