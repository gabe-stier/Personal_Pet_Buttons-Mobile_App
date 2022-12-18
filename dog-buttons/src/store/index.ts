import { createStore, Store } from "vuex";
import AuthModule from "./modules/auth";

const store: Store<any> = createStore({
  modules: {
    auth: AuthModule,
  },
});

export default store;
