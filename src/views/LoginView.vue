<template>
  <div class="wrapper">
    <div class="container" :class="{ active: isActive }">
      <div class="form-container sign-up">
        <form @submit.prevent="signUp" @keypress.enter="signUp">
          <h1 class="text-xl font-semibold">회원가입</h1>
          <input placeholder="아이디" v-model="username" />
          <input placeholder="닉네임" v-model="nickname" />
          <input placeholder="이메일" v-model="email" />
          <input type="password" placeholder="비밀번호" v-model="password" />
          <input type="password" placeholder="비밀번호 확인" v-model="passwordConfirm" />
          <button @click.prevent="signUp">회원가입</button>
        </form>
      </div>
      <div class="form-container sign-in">
        <form @submit.prevent="logIn" @keypress.enter="logIn">
          <RouterLink :to="{ name: 'home' }">
            <icon name="login-logo" />
          </RouterLink>
          <br />
          <br />
          <input class="input-field" type="text" placeholder="아이디" v-model="username" />
          <input class="input-field" type="password" placeholder="비밀번호" v-model="password" />

          <div v-show="!isRight" class="text-red-400">
            <p>
              아이디(로그인 전용 아이디)<br />
              또는 비밀번호를 잘못 입력했습니다.
            </p>
          </div>
          <button class="button" @click.prevent="logIn">로그인</button>
        </form>
      </div>
      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h1>다시 오신 것을 환영합니다 !</h1>
            <p>계속하려면 로그인 해주세요</p>
            <button class="hide" @click="toggleActive">로그인</button>
          </div>
          <div class="toggle-panel toggle-right">
            <h1>새로 오신 것을 환영합니다 !</h1>
            <p>회원가입을 완료하고<br />모든 기능을 이용해보세요</p>
            <button class="hide" @click="toggleActive">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/users';

const userStore = useUserStore();

const username = ref('');
const nickname = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const isRight = ref(true);

const logIn = async () => {
  const payload = {
    username: username.value,
    password: password.value,
  };

  await userStore.logIn(payload);

  const result = await userStore.getUserInfo(username.value);
  result ? (isRight.value = true) : (isRight.value = false);
};

const signUp = () => {
  const payload = {
    username: username.value,
    nickname: nickname.value,
    email: email.value,
    password1: password.value,
    password2: passwordConfirm.value,
  };
  userStore.signUp(payload);
};

const isActive = ref(false);

const toggleActive = () => {
  isActive.value = !isActive.value;
  username.value = nickname.value = email.value = password.value = passwordConfirm.value = '';
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.wrapper {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.container {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.container p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin: 20px 0;
}

.container span {
  font-size: 12px;
}

.container a {
  color: #333;
  font-size: 13px;
  text-decoration: none;
  margin: 15px 0 10px;
}

.container button {
  background-color: #fff;
  color: #fd5c63;
  font-size: 14px;
  padding: 10px 45px;
  border: 1px solid #fd5c63;
  border-radius: 8px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}

.container button.hide {
  background-color: #fd5c63;
  border: 1px solid transparent;
  color: #fff;
  font-size: 12px;
  padding: 10px 45px;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}

.container form {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
}

.container form h1 {
  margin: 16px 0;
}

.container input {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 90%;
  outline: none;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.active .sign-in {
  transform: translateX(100%);
}

.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: move 0.6s;
}

@keyframes move {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.social-icons {
  margin: 20px 0;
}

.social-icons a {
  border: 1px solid #ccc;
  border-radius: 20%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  width: 40px;
  height: 40px;
}

.toggle-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
}

.container.active .toggle-container {
  transform: translateX(-100%);
  border-radius: 0 150px 100px 0;
}

.toggle {
  background: linear-gradient(to right, #fff, #f2f2f2);
  height: 100%;
  color: #222222;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.container.active .toggle {
  transform: translateX(50%);
}

.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.toggle-panel h1 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.toggle-panel p {
  font-size: 16px;
  font-weight: 500;
}

.toggle-left {
  transform: translateX(-200%);
}

.container.active .toggle-left {
  transform: translateX(0);
}

.toggle-right {
  right: 0;
  transform: translateX(0);
}

.container.active .toggle-right {
  transform: translateX(200%);
}
</style>
