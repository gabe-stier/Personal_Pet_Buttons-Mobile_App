<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="page-content">
        <form>
          <ion-item lines="full">
            <ion-label position="floating">Email</ion-label>
            <ion-input
              type="text"
              required
              v-model="userInfo.username"
            ></ion-input>
          </ion-item>
          <ion-item lines="full">
            <ion-label position="floating">Password</ion-label>
            <ion-input
              type="password"
              required
              v-model="userInfo.password"
            ></ion-input>
          </ion-item>
          <ion-row>
            <ion-col>
              <ion-button
                type="submit"
                color="danger"
                expand="block"
                @click="login()"
                >Sign In</ion-button
              >
            </ion-col>
          </ion-row>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { mapGetters, mapActions } from "vuex";
import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonItem,
  IonToast,
  toastController,
} from "@ionic/vue";

import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    IonItem,
  },
  computed: {
    ...mapGetters("auth", {
      loginStatus: "getLoginStatus",
    }),
  },
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("auth", {
      loginUser: "loginUser",
    }),
    async login() {
      if (this.userInfo.username && this.userInfo.password) {
        await this.loginUser(this.userInfo);
        console.log(this.loginStatus);
        if (this.loginStatus === "success") {
          const toast = await toastController.create({
            message: "Login Successful",
            duration: 1500,
            position: "bottom",
          });
        } else {
          const toast = await toastController.create({
            message: "Login Failed",
            duration: 1500,
            position: "bottom",
          });
        }
      }
    },
  },
});
</script>