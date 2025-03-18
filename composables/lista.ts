export function useLista() {

    const incluirOrdem = (lista: any[]) => {
        let usuariosComOrdem: any[] = []
        if (lista && lista.length > 0) {
            usuariosComOrdem = lista.map((linha: any, index: number) => ({
                ...linha,
                ordem: index + 1
            }));
            return usuariosComOrdem
        }
        else
            return undefined
    }

}