import { jwtDecrypt } from "@/shared/helper";
import { Preferences } from '@capacitor/preferences';
import axios from "axios";

const state = () => ({
  authData: {
    token: "",
    refreshToken: "",
    tokenExp: "",
    userId: "",
    userName: "",
  },
  loginStatus: "success"
});

const getters = {
  getLoginStatus(state: any) {
    return state.loginStatus
  },
  getAuthData(state: any) {
    return state.authData
  }
};

const actions = {
  async loginUser({ commit }: any, payload: any) {
    console.log(payload);
    const response = await axios.post("http://192.168.1.32:3000/auth/login", payload)
    // const response = {
    //   access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTYwODIwNjE3OSwiZXhwIjozNjAxNjA4MjA2MTc5fQ.BcHKT6ffgvkt0EztkJT35a0Yc7iWF9wkeNxKB4wSJEQ",
    //   refresh_token: "fake_refresh_token"
    // };
    if (response.status == 200 || response.status == 201) {

      await Preferences.set({
        key: "access_token",
        value: response.data.access_token
      });
      await Preferences.set({
        key: "refresh_token",
        value: response.data.refresh_token
      });

      commit('saveAuthToken', response.data);
      commit('saveLoginStatus', 'success');
    } else {
      commit('saveLoginStatus', 'failed');
    }
  },
  async loadStorageTokens({ commit }: any) {
    const access_token = await Preferences.get({ key: "access_token" });
    const refresh_token = await Preferences.get({ key: "refresh_token" });
    if (access_token && refresh_token) {
      const tokenData = {
        access_token: access_token.value,
        refresh_token: refresh_token.value
      };
      commit("saveAuthToken", tokenData);
    }
  },
  async logoutUser({ commit }: any) {
    console.log("Logging out")
    const raw_data = {
      authData: {
        token: "",
        refreshToken: "",
        tokenExp: "",
        userId: "",
        userName: "",
      },
    }
    commit("setAuthToken", raw_data)
  }
};

const mutations = {
  saveAuthToken(state: any, payload: any) {
    let newAuthData = {}
    try {
      const jwtDecodeUserInfo = jwtDecrypt(payload.access_token);
      newAuthData = {
        token: payload.access_token,
        refreshToken: payload.refresh_token,
        tokenExp: jwtDecodeUserInfo.exp,
        userId: jwtDecodeUserInfo.sub,
        userName: jwtDecodeUserInfo.username,
      };
    } catch {
      newAuthData = {
        token: payload.access_token,
        refreshToken: payload.refresh_token,
        tokenExp: null,
        userId: null,
        userName: null,
      };
    }
    console.log(newAuthData)
    state.authData = newAuthData;
  },
  saveLoginStatus(state: any, status: string) {
    state.loginStatus = status;
  },
  setAuthToken(state: any, authData: any) {
    state.authData = authData
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
