//Actions: Backend API 호출
// Mutatios: 뜻은 변이라는 뜻이지만 쉽게 말하자면 Backend API 호출 결괏값을 파라미터로 전달받은 후 state에 값을 저장하게 된다.
// 위의 개념을 보고 아래 소스를 보면 이해하기 쉬울 것입니다.
// 아래 소스는 Backend Login API 호출 후 결과로 사용자 정보를 담고 있는 user 객체를 받은 후 mutations에서 user 객체와 로그인 상태를 저장하게 됩니다.

import AuthService from '../service/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, {username, password}) {
            return AuthService.login(username, password).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        }
    },
    getters: {
        isLoggedIn: state => state.loginSuccess
    }

};