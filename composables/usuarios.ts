import type { IUsuario } from '~/types/IUsuario';
import { getUsuarioByComponente, include, edit, remove } from '@/services/usuariosService';

interface Usuario extends Omit<IUsuario, "componentes"> {
    ID_COMPONENTES: number;
};

export function useUsuario(dados: Usuario) {
    
}