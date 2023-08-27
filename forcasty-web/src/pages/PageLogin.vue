<template>
    <div>
        <h1>Login</h1>
        <div ref="firebaseAuthContainer"></div>
    </div>
</template>
<script setup lang="ts">
import { onUnmounted, ref, watchEffect } from 'vue';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import 'firebaseui/dist/firebaseui.css'
import * as firebaseui from 'firebaseui'
import { useRouter } from 'vue-router';

const auth = getAuth()
const firebaseAuthUi = new firebaseui.auth.AuthUI(auth)
const firebaseAuthContainer = ref()
const router = useRouter()

const uiConfig: firebaseui.auth.Config = {
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  queryParameterForSignInSuccessUrl: 'redirect',
}

const unsubscribeOnAuthStateChanged = auth.onAuthStateChanged((user) => {
  if (user) {
    if (router.currentRoute.value.query.redirect) {
      router.replace(router.currentRoute.value.query.redirect as string)
    } else {
      router.replace('/')
    }
  } else {
    console.info('not logged in')
  }
})


watchEffect(() => {
  if (!!firebaseAuthContainer.value) {
    firebaseAuthUi.start(firebaseAuthContainer.value, uiConfig)
  }
})

onUnmounted(() => {
  unsubscribeOnAuthStateChanged()
  firebaseAuthUi.delete()
})
</script>
<style scoped>
:deep(.firebaseui-container) {
  @apply bg-base-100 font-normal shadow-none !important;
}

:deep(.firebaseui-title) {
  @apply text-base-content !important;
}

:deep(.firebaseui-text) {
  @apply text-base-content;
}

:deep(.firebaseui-textfield input) {
  @apply input input-bordered w-full border-solid text-base-content !important;
}

:deep(.mdl-textfield__label) {
  @apply text-xs !important;
  top: 4px !important;
}

:deep(.firebaseui-textfield.mdl-textfield .firebaseui-label::after) {
  @apply bg-transparent !important;
}
:deep(.firebaseui-textfield input) {
  outline-width: 0 !important;
  -webkit-appearance: none !important;
  box-shadow: none !important;
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
}

:deep(.firebaseui-id-submit) {
  @apply btn-primary text-primary-content !important;
}

:deep(.firebaseui-id-secondary-link) {
  @apply btn-ghost text-base-content !important;
}

:deep(.firebaseui-label) {
  @apply text-base-content !important;
}

</style>