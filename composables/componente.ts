export function useComponente() {
    const cpfMask = '###.###.###-##';
    const idadeMinima = 6

    const formatNome = (nome: string) => {
        return nome.replace(/[^A-Za-zçãêẽíóôõúüÇÃÊẼÍÓÔÕÚÜ\s]/g, '')
    }

    const parseNome = (nome: string) => {
        return nome.toUpperCase().replace(/[^A-Za-zçãêẽíóôõúüÇÃÊẼÍÓÔÕÚÜ\s]/g, '')
    }

    const formatCpf = (cpf: string) => {
        // Remove caracteres não numéricos
        const cleanCpf = cpf.replace(/[^\d]/g, '');
        // Aplica a máscara do CPF (###.###.###-##)
        return cleanCpf.length <= 11 ? cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, `$1.$2.$3-$4`) : '';
    };

    // Devolve o valor do CPF sem os caracteres . e -
    const parseCpf = (cpf: string) => {
        // Remove caracteres não numéricos
        const cleaned = cpf.replace(/\D/g, '');
        return cleaned;
    }

    const formatNumero = (numero: string) => {
        // Remove caracteres não numéricos
        const cleanNumero = numero.replace(/[^\d]/g, '');
        // Aplica a máscara do CPF (###.###.###-##)
        return cleanNumero;
    };

    // Devolve o valor do CPF sem os caracteres . e -
    const parseNumero = (numero: string) => {
        // Remove caracteres não numéricos
        const cleaned = numero.replace(/\D/g, '');
        return cleaned;
    }


    const formatTelefone = (telefone: string) => {
        // Remove caracteres não numéricos
        const cleanTelefone = telefone.replace(/[^\d]/g, '');
        // Aplica a máscara do CPF (###.###.###-##)
        return cleanTelefone.length <= 11 ? cleanTelefone.replace(/(\d{2})(\d{5})(\d{4})/, `($1) $2-$3`) : '';
    };

    // Devolve o valor do CPF sem os caracteres . e -
    const parseTelefone = (telefone: string) => {
        // Remove caracteres não numéricos
        const cleaned = telefone.replace(/\D/g, '');
        return cleaned;
    }

    const formatCep = (cep: string) => {
        // Remove caracteres não numéricos
        const cleanCep = cep.replace(/[^\d]/g, '');
        // Aplica a máscara do CPF (###.###.###-##)
        return cleanCep.length <= 10 ? cleanCep.replace(/(\d{2})(\d{3})(\d{3})/, `$1.$2-$3`) : '';
    };

    // Devolve o valor do CPF sem os caracteres . e -
    const parseCep = (cep: string) => {
        // Remove caracteres não numéricos
        const cleaned = cep.replace(/[^\d]/g, '');
        return cleaned;
    }

    const validateCpf = (cpf: string) => {
        const cleanCpf = cpf.replace(/[^\d]/g, '');
        if (cleanCpf.length !== 11) return false;

        if ([
            '00000000000',
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999',
        ].indexOf(cleanCpf) !== -1)
            return false

        const soma1 = cleanCpf
            .substring(0, 9)
            .split('')
            .map((num, idx) => parseInt(num) * (10 - idx))
            .reduce((acc, num) => acc + num, 0);

        let resto1 = (soma1 * 10) % 11;
        resto1 = resto1 === 10 || resto1 === 11 ? 0 : resto1;

        const soma2 = cleanCpf
            .substring(0, 10)
            .split('')
            .map((num, idx) => parseInt(num) * (11 - idx))
            .reduce((acc, num) => acc + num, 0);

        let resto2 = (soma2 * 10) % 11;
        resto2 = resto2 === 10 || resto2 === 11 ? 0 : resto2;

        return resto1 === parseInt(cleanCpf[9]) && resto2 === parseInt(cleanCpf[10]);
    };

    // Formata a TEFA permitindo apenas números.
    const formatTefa = (value: string) => {
        // Remove caracteres não numéricos
        const cleaned = value.replace(/\D/g, '');
        // Aplica a máscara do CPF (###.###.###-##)
        //const formatted = cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');  
        return cleaned;
    }

    // Devolve o valor do TEFA sem formatação
    const parseTefa = (value: string) => {
        // Remove caracteres não numéricos
        const cleaned = value.replace(/\D/g, '');
        return cleaned;
    }

    const ruleValidateCpf = (rule: any, value: string, callback: any) => {
        if (!value && value.trim() === '') {
            callback(new Error('CPF obrigatório.'))
        } else if (!validateCpf(value.trim())) {
            callback(new Error('CPF inválido'))
        } else {
            callback()
        }
    }

    const verificarString = (str: string, tamanhoMin: number, tamanhoMax: number): boolean => {
        // Verificar se a string contém apenas números e está dentro do intervalo de tamanhos
        const regex = new RegExp(`^[0-9]{${tamanhoMin},${tamanhoMax}}$`);
        return regex.test(str);
    }

    const ruleValidateTefa = (rule: any, value: any, callback: any) => {
        if (!value && value.trim() === '') {
            callback(new Error('TEFA obrigatória.'))
        } else if (!verificarString(value.trim(), 3, 10)) {
            callback(new Error('TEFA inválida'))
        } else {
            callback()
        }
    }

    const ruleValidateEmail = (rule: any, value: any, callback: any) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!value && value.trim() === '') {
            callback(new Error('E-mail obrigatório.'))
        } else if (!emailRegex.test(value.trim())) {
            callback(new Error('E-mail inválido.'))
        } else {
            callback()
        }
    }

    const ruleValidateDataNascimento = (rule: any, value: Date, callback: any) => {
        if (!value && isNaN(value)) {
            callback(new Error('Data de Nascimento obrigatório.'))
            // Idade mínima para se cadastrar na banda: 6 anos
        } else if (!verificarMaioridade(value, idadeMinima)) {
            callback(new Error('Idade abaixo da permitida'))
        } else {
            callback()
        }
    }

    const ruleValidateDataInclusao = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Data de Inclusão obrigatória.'))
        } else if ("") {
            callback(new Error('Data de Inclusão inválida.'))
        } else {
            callback()
        }
    }

    const ruleValidateCep = (rule: any, value: any, callback: any) => {
        const regex = /^(\d{2}\.\d{3}-\d{3}|\d{5}-\d{3}|\d{8})$/;
        if (!value && value.trim() === '') {
            callback(new Error('CEP obrigatório.'))
        } else if (!regex.test(value.trim())) {
            callback(new Error('CEP inválido.'))
        } else {
            callback()
        }
    }

    const ruleValidateNumero = (rule: any, value: any, callback: any) => {
        const regex = /^\d{1,8}$/;
        if (!value && value.trim() === '') {
            callback(new Error('CEP obrigatório.'))
        } else if (!regex.test(value.trim())) {
            callback(new Error('CEP inválido.'))
        } else {
            callback()
        }
    }

    const validateTeleforne = (telefone: string) => {
        if ([
            '00000000000',
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999',
        ].indexOf(telefone) !== -1)
            return false
        const regex = /^\d{11}$/;
        return regex.test(telefone)
    }

    const ruleValidateTelefone = (rule: any, value: any, callback: any) => {
        if (!value && value.trim() === '') {
            callback(new Error('Telefone obrigatório.'))
        } else if (!validateTeleforne(value.trim())) {
            callback(new Error('Telefone inválido.'))
        } else {
            callback()
        }
    }

    const ruleValidateNome = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('Nome obrigatório.'))
        } else if ("") {
            callback(new Error('Nome inválido.'))
        } else {
            callback()
        }
    }

    const disabledDateNascimentoAfter = (nova: Date) => {
        const data = dataMinima(idadeMinima);
        return nova > data;
    }

    const disabledDateAfter = (nova: Date) => {
        const data = new Date;
        return nova > data;
    }

    const getDataMinima = () => {
        return dataMinima(idadeMinima)
    }

    const dataMinima = (idade: number) => {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const dataNascimento = new Date(anoAtual - idade, dataAtual.getMonth(), dataAtual.getDate());
        return dataNascimento
    }

    const verificarMaioridade = (data: Date, maioridade: number): boolean => {
        const nascimento = data;
        const atual = new Date();
        const diferencaMilisegundos = atual.getTime() - nascimento.getTime();
        const diferenca = diferencaMilisegundos / (1000 * 31536000);
        if (diferenca >= maioridade) {
            return true;
        } else {
            return false;
        }
    }

    return {
        formatCpf,
        parseCpf,
        formatCep,
        parseCep,
        validateCpf,
        formatTefa,
        parseTefa,
        formatNome,
        parseNome,
        formatTelefone,
        parseTelefone,
        ruleValidateTelefone,
        ruleValidateDataInclusao,
        ruleValidateDataNascimento,
        ruleValidateNome,
        ruleValidateTefa,
        ruleValidateCep,
        ruleValidateCpf,
        disabledDateAfter,
        disabledDateNascimentoAfter,
        getDataMinima,
        ruleValidateEmail,
        formatNumero
    };
}