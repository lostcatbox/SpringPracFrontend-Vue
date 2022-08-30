//실제 서버와의 통신을 통하여서 로그인 성공 시 응답 값을 받아서 Local Storage에 저장하는 역할과 vuex를 이용하여서 사용자의 로그인 여부를 state에 저장 함으로써 다른 컴포넌트에서도 사용자의 로그인 여부를 판단할 수 있다.

import {ref} from 'vue';
import store from '../store/index';

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {

    error.value = null
    isPending.value = true


    try {
        await store.dispatch('auth/login', {email, password})

        error.value = null
        isPending.value = false
    } catch(err) {
        error.value = '로그인 정보가 올바르지 않습니다.'
        isPending.value = false
    }
}

const useLogin = () => {
    return { error, login, isPending }
}

export default useLogin
