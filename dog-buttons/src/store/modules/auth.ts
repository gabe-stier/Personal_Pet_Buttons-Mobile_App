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
  loginStatus: "loggedout"
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
    try {

      const response = await axios.post("http://192.168.1.32:3000/auth/login", payload)
      console.log(response.status)
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
    } catch {
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
      commit('saveLoginStatus', 'success');
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
    await Preferences.remove({ key: "access_token" });
    await Preferences.remove({ key: "refresh_token" });
    commit("setAuthToken", raw_data)
    commit("saveLoginStatus", "loggedout")
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
