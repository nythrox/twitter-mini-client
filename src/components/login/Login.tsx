import React, { useState, useEffect, useContext } from "react";
import { useLocalStore } from "mobx-react";
import AuthRepository from "../../repositories/AuthRepository";
import TwitterMiniAPI from "../../axios";
import { LoginResultDto } from "../../../../twittermini-api/src/modules/auth/auth.service";
import { AppContext } from "../../stores/AppStore";
import { Button } from "rsuite";
import { Link, useHistory } from "react-router-dom";
export function Login() {
  const history = useHistory()
  const appStore = useContext(AppContext);
  const loginStore = useLocalStore(() => ({
    email: "",
    password: ""
  }));
  return (
    <div>
      <input
        name="email"
        type="email"
        placeholder="example@gmail.com"
        onChange={e => {
          loginStore.email = e.target.value;
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="********"
        onChange={e => {
          loginStore.password = e.target.value;
        }}
      />
      <Button appearance="primary" onClick={e => submit()}>
        Login
      </Button>
      <br/>
      <Link to="/register">Dont have an account? Create one here. </Link>
    </div>
  );
  async function submit() {
    const authRepostory = new AuthRepository(TwitterMiniAPI);
    try {
      const result: LoginResultDto = await authRepostory.login(loginStore);
      console.log(result);
      appStore.login(result.user, result.accessToken, result.refreshToken);
      history.replace('/')
    } catch (e) {
      alert(e);
    }
  }
}
