<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="page-content">
        <form>
          <ion-item lines="full">
            <ion-label position="floating">Volume</ion-label>
            <ion-range
              :pin="true"
              :pin-formatter="pinFormatter"
              :ticks="true"
              :snaps="true"
              :min="1"
              :max="10"
              :value="slider_value"
            >
              <ion-label slot="start">1</ion-label>
              <ion-label slot="end">10</ion-label>
            </ion-range>
          </ion-item>
          <ion-item lines="full" id="silence">
            <ion-label position="fixed" slot="start">Silent</ion-label>
            <ion-checkbox position="fixed" slot="end" :checked="silenced">
            </ion-checkbox>
          </ion-item>
          <ion-item position="fixed" lines="full">
            <ion-label>Length of Silence:</ion-label>
            <ion-select interface="popover" placeholder="Select Hour">
              <ion-select-option
                v-for="(p, i) in silence_hours"
                :value="p.value"
                :key="i"
              >
                {{ p.name }}
              </ion-select-option>
            </ion-select>
            hours
            <ion-select interface="popover" placeholder="Select Minute">
              <ion-select-option
                v-for="(p, i) in silence_minutes"
                :value="p.value"
                :key="i"
              >
                {{ p.name }}
              </ion-select-option>
            </ion-select>
            minutes
          </ion-item>
          <ion-row>
            <ion-col>
              <ion-button type="submit" color="danger" expand="block">
                Save
              </ion-button>
            </ion-col>
          </ion-row>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import {
  IonRange,
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
  IonCheckbox,
  IonSelectOption,
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonRange,
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
    IonCheckbox,
    IonSelectOption,
  },
  data() {
    const silenced = true;
    const slider_value = 4;
    return { silenced, slider_value };
  },
  setup() {
    const silence_minutes = [];
    const silence_hours = [];
    for (let i = 0; i < 60; i++) {
      silence_minutes.push({
        name: i,
        value: i,
      });
    }
    for (let i = 0; i < 24; i++) {
      silence_hours.push({
        name: i,
        value: i,
      });
    }
    return {
      pinFormatter: (value: number) => `${value}`,
      silence_minutes,
      silence_hours,
    };
  },
});
</script>
<style>
#silence ion-item {
  width: 50%;
}
</style>