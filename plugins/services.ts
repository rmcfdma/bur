// import ComponenteService from '@/services/ComponenteService'
// import BrudService from '@/services/BrudService'
// import AuthService from '@/services/AuthService'
// import FuncaoService from '@/services/FuncaoService'
// import UtilService from '@/services/UtilService'
import UsuarioService from '@/services/UsuarioService'
// import FileService from '@/services/FileService'
import AwsService from '@/services/AwsService'

export default defineNuxtPlugin((nuxt) => {
  const api_base_url = nuxt.$config.public.API_BASE_URL
  const frontend_base_url = nuxt.$config.public.FRONTEND_BASE_URL
  const aws_region = nuxt.$config.public.AWS_REGION
  const access_key_id = nuxt.$config.public.AWS_ACCESS_KEY_ID
  const secret_access_key = nuxt.$config.public.AWS_SECRET_ACCESS_KEY

  return {
    provide: {
      // componenteService: new ComponenteService(api_base_url),
      // brudService: new BrudService(api_base_url),
      // authService: new AuthService(api_base_url),
      // fileService: new FileService(api_base_url),
      // funcaoService: new FuncaoService(api_base_url),
      usuarioService: new UsuarioService(api_base_url),
      // utilService: new UtilService(frontend_base_url),
      awsService: new AwsService(aws_region, access_key_id, secret_access_key),   
    },
  }
})