import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class AuthService {
    /**
     * 로그인
     */
    login(email, password) {
        return axios.post('/login',
            {
            email: email,
            password: password
        })
            .then(response => {
                console.log(response.data.data.Authorization)
                if (response.data.data) {
                    localStorage.setItem('user', JSON.stringify(response.data.data)); //localStorage에 User데이터 저장
                    localStorage.setItem('authorization', response.data.data.Authorization);
                }

                return response.data;
            });
    }

    /**
     * 로그아웃
     */
    logout() {
        // LocalStorage 사용자 정보
        let user = JSON.parse(localStorage.getItem('user'))

        let data = {
            email: user.email
        }

        return axios.post(API_URL + 'signout', JSON.stringify(data), {
            headers: {
                "Content-Type": 'application/json',
            },
        })
            .then(response => {
                console.log(response)
                localStorage.removeItem('authorization');
            });
    }
}

export default new AuthService();