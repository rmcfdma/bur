import { authStore } from '@/store/auth';
import { breadcrumbsStore } from '@/store/breadcrumbs';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth_store = authStore();
  const store_breadcrumbs = breadcrumbsStore();
  const { setBreadcrumbs } = store_breadcrumbs;
  const authenticated = auth_store.isAuthenticated;

  try {
    const {$authService, $router} = useNuxtApp()
    const resultado = await $authService.tokenIsValid()
    if (!resultado || !auth_store.getAccessToken) {
      auth_store.setAccessToken(null)
      setBreadcrumbs([['8', 'Login', '/login', 'Página de Login']]);
      $router.push('/login')
    } else {

    }
  } catch (error) {
    console.log("No service o erro é: " + error)
  }
});