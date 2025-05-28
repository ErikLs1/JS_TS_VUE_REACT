import {computed, ref} from "vue";
import {defineStore} from "pinia";

export const useAccountStore = defineStore('account', () => {
    const jwt = ref<string | null>(localStorage.getItem('_jwt'));
    const refreshToken = ref<string | null>(localStorage.getItem('_refreshToken'));
    const role = ref<string | null>(localStorage.getItem('_role'));

    const isAuthenticated = computed(() => !!jwt.value);

    function setAuth(payload: { jwt: string; refreshToken: string; role: string }) {
        jwt.value = payload.jwt;
        refreshToken.value = payload.refreshToken;
        role.value = payload.role;

        localStorage.setItem('_jwt', payload.jwt);
        localStorage.setItem('_refreshToken', payload.refreshToken);
        localStorage.setItem('_role', payload.role);
    }

    function clearAuth() {
        jwt.value = refreshToken.value = role.value = null;

        localStorage.removeItem('_jwt');
        localStorage.removeItem('_refreshToken');
        localStorage.removeItem('_role');
    }

    return { jwt, refreshToken, role, isAuthenticated, setAuth, clearAuth }
})