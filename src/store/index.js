// store객체를 생성하고 모듈을 관리한다.
import { createStore } from "vuex";
import { auth } from "./auth.module";

const store = createStore({  //store의 핵심은 state, mutations, actions, getters이다. auth에 구현되어있다.
    modules: {
        auth,
    },
});

export default store;   