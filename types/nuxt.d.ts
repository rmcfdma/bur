// types/nuxt.d.ts Para o TypScript reconhecer os tipos dos services

import { ComponenteService } from '@/services/ComponenteService';
import { BrudService } from '@/services/BrudService';
import { AuthService } from '@/services/AuthService';
import { FuncaoService } from '@/services/FuncaoService';
import { UtilService } from '@/services/UtilService';
import { UsuarioService } from '@/services/UsuarioService';
import { FileService } from '@/services/FileService';
import { AwsService } from '@/services/AwsService';

declare module '#app' {
  interface NuxtApp {
    $componenteService: ComponenteService;
    $brudService: BrudService;
    $authService: AuthService;
    $fileService: FileService;
    $funcaoService: FuncaoService;
    $usuarioService: UsuarioService;
    $utilService: UtilService;
    $awsService: AwsService;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $componenteService: ComponenteService;
    $brudService: BrudService;
    $authService: AuthService;
    $fileService: FileService;
    $funcaoService: FuncaoService;
    $usuarioService: UsuarioService;
    $utilService: UtilService;
    $awsService: AwsService;
  }
}
