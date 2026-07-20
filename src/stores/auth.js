import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { getRuntimeConfig } from '@/config/runtimeConfig';

export const useAuthStore = defineStore('auth', () => {
  const username = ref('');
  const accessToken = ref('');
  const tokenType = ref('');
  const isLoading = ref(false);
  const isLoggedIn = ref(false);

  const login = async (user, pass) => {
    isLoading.value = true;
    try {
      const { authBaseUrl, oauthClientId } = getRuntimeConfig();
      const tokenRequest = new URLSearchParams({
        grant_type: 'password',
        username: user,
        password: pass,
        scope: '',
      });

      if (oauthClientId) {
        tokenRequest.set('client_id', oauthClientId);
      }

      const response = await axios.post(
        `${authBaseUrl}/api/oauth2/token`,
        tokenRequest.toString(),
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      username.value = user;
      accessToken.value = response.data.access_token;
      tokenType.value = response.data.token_type;
      isLoggedIn.value = true;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    username.value = '';
    accessToken.value = '';
    tokenType.value = '';
    isLoggedIn.value = false;
  };

  return { username, accessToken, tokenType, isLoading,isLoggedIn,login, logout };
});
