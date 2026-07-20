import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const BASE_API_URL = ref('http://192.168.50.94:6060/gdai/v1');
  const username = ref('');
  const accessToken = ref('');
  const tokenType = ref('');
  const isLoading = ref(false);
  const isLoggedIn = ref(false);

  const login = async (user, pass) => {
    isLoading.value = true;
    try {
      const response = await axios.post(
        `${BASE_API_URL.value}/api/oauth2/token`,
        new URLSearchParams({
          grant_type: 'password',
          username: user,
          password: pass,
          scope: '',
          client_id: 'string',
          client_secret: 'string'
        }).toString(),
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