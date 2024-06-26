import axios from "axios";
import { defineStore } from "pinia";
import { Router } from "vue-router";

export type authState = {
  authUser: {}| null,
  authToken: string | undefined,
  authError: {} | null
}

export type RegisterUserType = {
  firstName: string,
  lastName: string,
  birthday: string,
  email: string,
  password: string,
  address: string,
  postalCode?: string
}

export type LoginUserType = {
  username: string,
  password: string
}

declare module 'pinia' { export interface PiniaCustomProperties {$router: Router} }

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({ authUser: null, authToken: undefined, authError: null } as authState),
    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken,
        error: (state) => state.authError,
    },
    actions: {
        async getToken() {
            await axios.get('/sanctum/csrf-cookie');
        },
        async login(form: LoginUserType) {
            // await this.getToken();
            await axios.post('http://localhost/api/login', form).then(
                (res) => {
                    console.log(res)
                    this.authToken = res.data.accessToken;
                    // this.authUser = res.data.user;
                    this.$router.push('/');
                }
            ).catch((errors) => {
                let desc = '';
                errors.response.data.errors.map(
                    (e) => {
                        desc = desc + ' ' + e
                    }
                )
                this.authError = desc;

            })
        },
        async register(form: RegisterUserType) {
            // await this.getToken();
            await axios.post('http://localhost/api/register', form).then(
                (res) => {
                    this.$router.push('/login');
                }
            ).catch((errors) => {
                let desc = '';
                console.log(errors);
                errors.response.data.errors.map((e) => {
                    desc = desc + ' ' + e;
                })
                this.authError = desc;
            })
        },
        async logout() {
            await axios.get('localhost/api/logout', {
              headers:{
                Authorization: 'Bearer ' + this.authToken
              } 
            });
            this.authToken = undefined;
            this.authUser = null;
            this.authError = null;
            this.$router.push('/login');
        },
    },
    persist: true
});