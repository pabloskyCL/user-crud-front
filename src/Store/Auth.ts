import axios from "axios";
import { defineStore } from "pinia";
import { Router } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";

export type authState = {
  authUser: {
    id: number,
    name: string,
    email: string,
    roles: string[]
  } | null,
  authToken: string | undefined,
  authError: {} | null
}

export type RegisterUserType = {
  name: string
  email: string,
  password: string
}

export type LoginUserType = {
  email: string,
  password: string
}


export type role = {
  name: string
}

declare module 'pinia' { export interface PiniaCustomProperties { $router: Router } }

const { toast } = useToast()

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
      await this.getToken();
      await axios.post('http://localhost/api/login', form).then(
        (res) => {
          this.authToken = res.data.accessToken;
          this.authUser = res.data.user;
          this.$router.push('/');
        }
      )
    },
    async register(form: RegisterUserType) {
      await this.getToken();
      await axios.post('http://localhost/api/register', form).then(
        () => {
          this.$router.push('/login').then(() => {
            toast({
              title: 'Usuario creado con exito',
              description: 'ya puedes iniciar sesion',
              class: 'bg-teal-600 text-white'
            })
          });
        }
      )
    },
    async logout() {
      await axios.get('localhost/api/logout', {
        headers: {
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