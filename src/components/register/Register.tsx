import React, { useContext } from "react";
import { AppContext } from "../../stores/AppStore";
import { useLocalStore } from "mobx-react";
import { Button } from "rsuite";
import AuthRepository from "../../repositories/AuthRepository";
import TwitterMiniAPI from "../../axios";
import { RegisterResultDto } from "../../../../twittermini-api/src/modules/auth/auth.service";
import { useHistory } from "react-router-dom";
export function Register() {
  const appStore = useContext(AppContext);
  const history = useHistory()
  const registerStore = useLocalStore(() => ({
    email: "",
    password: "",
    name: "",
    handle: ""
  }));
  return (
    <div>
      <input
        name="email"
        type="email"
        placeholder="example@gmail.com"
        onChange={e => {
          registerStore.email = e.target.value;
        }}
      />
      <input
        name="name"
        type="text"
        maxLength={45}
        placeholder="name"
        onChange={e => {
          registerStore.name = e.target.value;
        }}
      />
      <input
        name="handle"
        type="text"
        maxLength={30}
        placeholder="handle"
        onChange={e => {
          registerStore.handle = e.target.value;
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="********"
        onChange={e => {
          registerStore.password = e.target.value;
        }}
      />
      <Button appearance="primary" onClick={e => submit()}>
        Register
      </Button>
    </div>
  );
  async function submit() {
    const authRepostory = new AuthRepository(TwitterMiniAPI);
    try {
      const result: RegisterResultDto = await authRepostory.register(
        registerStore
      );
      appStore.login(result.user, result.accessToken, result.refreshToken);
      history.replace('/')
    } catch (e) {
      alert(e);
    }
  }
}
