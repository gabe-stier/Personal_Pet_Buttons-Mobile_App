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
      <form id="login-page">
        <ion-item lines="full">
          <ion-label position="floating">Email</ion-label>
          <ion-input type="text" required></ion-input>
        </ion-item>
        <ion-item lines="full">
          <ion-label position="floating">Password</ion-label>
          <ion-input type="password" required></ion-input>
        </ion-item>
        <ion-row>
          <ion-col>
            <ion-button type="submit" color="danger" expand="block"
              >Sign In</ion-button
            >
          </ion-col>
        </ion-row>
      </form>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import {
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
} from "@ionic/vue";
export default defineComponent({
  components: {
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
  },
});
</script>

<style>
#login-page {
  width: 75%;
  margin: auto;
  margin-top: 50%;
}
</style>