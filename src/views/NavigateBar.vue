<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

// API 基礎 URL（可修改）
const BASE_API_URL = ref('http://192.168.50.94:6060/gdai/v1');

const username = ref('cpc8'); // 預設值
const password = ref('cpc8');   // 預設值
// const accessToken = ref('');
// const tokenType = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const showDialog = ref(false);
// const isLoggedIn = ref(false);

const authStore = useAuthStore();

const showLoginDialog = () => {
  showDialog.value = true;
  errorMessage.value = ''; // 重置錯誤訊息
  username.value = 'cpc8'; // 重置為預設值，可選
  password.value = 'cpc8';
};

const closeDialog = () => {
  if (!isLoading.value) {
    showDialog.value = false;
  }
};

const handleLogin = async () => {
  try {
    await authStore.login(username.value, password.value);
    showDialog.value = false;
  } catch (error) {
    errorMessage.value = '登入失敗: ' + (error.response?.data?.message || error.message);
  }
};

// 登入函數
// const login = async () => {
//   isLoading.value = true;
//   errorMessage.value = '';

//   try {
//     const response = await axios.post(
//       `${BASE_API_URL.value}/api/oauth2/token`,
//       new URLSearchParams({
//         grant_type: 'password',
//         username: username.value,
//         password: password.value,
//         scope: '',
//         client_id: 'string',
//         client_secret: 'string'
//       }).toString(),
//       {
//         headers: {
//           'accept': 'application/json',
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       }
//     );

//     // 提取回應資料
//     accessToken.value = response.data.access_token;
//     tokenType.value = response.data.token_type;
//     isLoggedIn.value = true;
//     showDialog.value = false; // 登入成功後關閉對話框
//     console.log('登入成功:', response.data);
//   } catch (error) {
//     errorMessage.value = '登入失敗: ' + (error.response?.data?.message || error.message);
//     console.error('登入錯誤:', error);
//   } finally {
//     isLoading.value = false;
//   }
// };

// // 登出函數
// const logout = () => {
//   accessToken.value = '';
//   tokenType.value = '';
//   isLoggedIn.value = false;
//   console.log('已登出');
// };


</script>
<template>
  
  <nav>
    
    <div class="div-main">
      <div class="div-left-area">
        <div class="div-image-area">
          <img src="../assets/images/ASUS_IOT_LOGO.png" alt="" />
        </div>

        <div class="div-page-control-buttons">
          <!-- <RouterLink
            class="button-page-control"
            active-class="button-page-control-isworking"
            to="/"
          >
            <AppIcon class="mx-2" name="home" type="svg" :size="20" color="#FFFFFF"></AppIcon>
            <span>Home</span>
          </RouterLink> -->

          <!-- <RouterLink
            class="button-page-control"
            active-class="button-page-control-isworking"
            to="/projects"
          >
            <AppIcon class="mx-2" name="project" type="svg" :size="20" color="#FFFFFF"></AppIcon>
            <span>Projects</span>
          </RouterLink> -->

          <!-- <RouterLink
            class="button-page-control"
            active-class="button-page-control-isworking"
            to="/account"
          >
            <AppIcon class="mx-2" name="account" type="svg" :size="20" color="#FFFFFF"></AppIcon>
            <span>Account</span>
          </RouterLink> -->

          <!-- <RouterLink
            class="button-page-control"
            active-class="button-page-control-isworking"
            to="/system"
          >
            <AppIcon class="mx-2" name="system" type="svg" :size="20" color="#FFFFFF"></AppIcon>
            <span>System</span>
          </RouterLink> -->

          <RouterLink
            class="button-page-control"
            active-class="button-page-control-isworking"
            to="/defect_generator"
          >
          <AppIcon class="mx-2" name="home" type="svg" :size="20" color="#FFFFFF"></AppIcon>
            <span>DefectGenerator</span>
          </RouterLink>
          
        </div>
      </div>

      <div class="div-right-area  ">
        <div>
          <button v-if="authStore.isLoggedIn == false" class="button-login"  @click="showLoginDialog" >Login</button>
          <button v-else class="button-login"  @click="authStore.logout()" >Logout</button>
        </div>
        
        <!-- <button class="button-sub-functions">
          <AppIcon name="notifications" type="svg" :size="20" color="#FFFFFF"></AppIcon>
        </button> -->

        <div class="div-color-bar">
          <div class="div-color-bar-1"></div>
          <div class="div-color-bar-2"></div>
          <div class="div-color-bar-3"></div>
        </div>

        <!-- <div class="div-aisvision">AISVision</div> -->
      </div>
    </div>

    <div class="div-bottom-line"></div>
  </nav>
  <!-- 登入視窗 -->
  <div class="model-overlay-all">
  <div v-if="showDialog" class="modal-overlay" @click.self="closeDialog">
    <div class="login-area-bar" style="position: relative;"> 
      <div v-if="authStore.isLoading == true" class="spinner-border text-primary spinner " style="position: absolute;" role="status">
        <span class="visually-hidden ">Loading...</span>
      </div>
    </div>
   
    <div class="login-area" >
      
      <label for="username" class="login-username" >
        Username&nbsp;&nbsp;  <input type="text" id="username" v-model="username" placeholder="輸入使用者名稱" >
      </label><br>
      <label for="password" class="login-password">
        Password&nbsp;&nbsp; <input type="password" id="password" v-model="password" placeholder="輸入密碼" >
      </label>
      
      <div class="button-group">
        
        <button class="button-check" @click="handleLogin" :disabled="authStore.isLoading" >確定</button>
        <button class="button-cancel" @click="closeDialog" :disabled="authStore.isLoading">取消</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.div-main {
  height: 52px;
  background: linear-gradient(104.01deg, #0051eb 42.78%, #0045c9 86.37%);
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.div-bottom-line {
  height: 4px;
  background: linear-gradient(148.45deg, #0093ff 26.36%, #007fff 69.02%);
}

/* left area */

.div-left-area {
  display: flex;
  justify-content: start;
  
}

.div-image-area {
  width: 140px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.div-image-area > img {
  height: 24px;
}

.div-page-control-buttons {
  display: flex;
  justify-content: flex-start;
  
}

.button-page-control {
  width: 150px;
  background: transparent;
  color: white;
  border: none;
  font-weight: 700;
  font: Inter;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.button-page-control-isworking {
  border-bottom: 4px solid #5ce0ff;
  background-color: rgba(255, 255, 255, 0.1);
  animation: button-page-control-isworking-animation 0.5s;
}

@keyframes button-page-control-isworking-animation {
  0% {
    border-bottom: 4px solid transparent;
    background-color: rgba(255, 255, 255, 0);
  }
  100% {
    border-bottom: 4px solid #5ce0ff;
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.button-page-control > img {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.button-page-control:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.button-page-control:active {
  background-color: rgba(255, 255, 255, 0.5);
}

/* ---------------------------------------------------------------------------------------------------- */

/* right area */

.div-right-area {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 20px;
  
}

.div-aisvision {
  font-size: 16px;
  font-weight: 900;
  color: white;
}

.button-sub-functions {
  background: transparent;
  border: none;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 50%;
}

.button-sub-functions > img {
  height: 24px;
  width: 24px;
}

.button-sub-functions:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.button-sub-functions:active {
  background-color: rgba(255, 255, 255, 0.5);
}

.div-color-bar {
  margin: 0px -70px 0px -70px;
  background: transparent;
  pointer-events: none;
}

.div-color-bar > div {
  height: 20px;
  width: 200px;
  margin: 18px;
  transform: rotate(-60deg);
  border: 1px solid #ffffff1f;
}

.div-color-bar-1 {
  background: #2668ffcc;
}

.div-color-bar-2 {
  background: #1a60ffcc;
}

.div-color-bar-3 {
  background: #0052efcc;
}

/* login--------------------------------- */
.login-container {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}

button {
  background-color: #ffffff;
  color: white;
  cursor: pointer;
  margin: 5px;
}
.model-overlay-all{

}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* border-top-right-radius: 10px;
  border-top-left-radius: 10px; */
  background: rgba(0, 0, 0, 0.3);
  /* background: #0052efcc; */
  /* background-color:  #0052efcc; */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ffffff1f;
  z-index: 99;
}
.button-login {
  background: transparent;
  border: none;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  /* border-radius: 50%; */
}
.login-area{
  
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 25%;
  width: 23%;
  margin-top: 3%;
  position: fixed;
  background-color:#ffffff;
  z-index: 100;
}
.login-area-bar{
  width: 23%;
  height: 29%;
  background: #0052efcc;
  border-radius: 10px;
}

.login-username{
  top: 0;
  left:5%;
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.login-password{
  top: 0;
  left:5%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  border-radius: 5px;
}

.button-group{
  display: flex;
  margin-top: 5%;
  justify-content:center;
  z-index: 101;
}
.button-check,.button-cancel{
  color: black;
  background-color:  #f0f0f0;
  border-radius: 5px;
}
.spinner{
  display: flex;
  justify-content: center;
  align-items: center;
  right: 45%;
  top:43%;
  z-index: 105;
  
}

.button:disabled{
  background-color: #ccc;
  cursor: not-allowed;
}

</style>
