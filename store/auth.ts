import { defineStore } from 'pinia';
import { jwtDecode } from "jwt-decode";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

}

export const authStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken,
    getUsuario: (state) => {
      if (state.accessToken) {
        const objeto: any = jwtDecode(state.accessToken);
        return objeto['0'];
      }
      else {
        return null;
      }
    },
  },

  actions: {
    setAccessToken(accessToken: string | null) {
      this.accessToken = accessToken;
    },

    setRefreshToken(refreshToken: string | null) {
      this.refreshToken = refreshToken;
    },

    setTokensInPinia(accessToken: string | null, refreshToken: string | null) {
      this.refreshToken = refreshToken;
      this.accessToken = accessToken;
    },

    clearAccessToken() {
      this.accessToken = null;
    },

    clearRefreshToken() {
      this.refreshToken = null;
    },

    clearTokensInPinia() {
      this.refreshToken = null;
      this.accessToken = null;
    },
  }
})