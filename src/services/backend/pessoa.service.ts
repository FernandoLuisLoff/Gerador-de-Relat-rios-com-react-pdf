import { ValidUtils } from "../../utils/valid.utils";
import type { PessoaDto } from "../dtos/pessoa.dto";

export class PessoaService {
    async getPessoaList(qtdRegistros: number): Promise<PessoaDto[]> {
        const pessoaList: PessoaDto[] = [];

        await new Promise(resolve => setTimeout(resolve, 500)); // Só pra forçar o loading (simular backend)

        for (let indice=1; indice<=qtdRegistros; indice++) {
            pessoaList.push({
                indice: indice,
                nome: `${sortearNome()} ${sortearSobrenome()}`,
                cpf: sortearCpf(),
                dataNascimento: sortearDataNascimento(),
                salario: sortearSalario()
            });
        }

        return pessoaList;
    }
}

const sortearNome = (): string => {
    const index = Math.floor(Math.random() * nomes.length);
    return nomes[index];
}

const sortearSobrenome = (): string => {
    const index = Math.floor(Math.random() * sobrenomes.length);
    return nomes[index];
}

const sortearCpf = (): string => {
    let cpfGerado = "";
    let cpfValido = false;

    while (!cpfValido) {
        cpfGerado = "";
        for (let i = 0; i < 11; i++) {
            const digito = Math.floor(Math.random() * 10);
            cpfGerado += digito.toString();
        }
        cpfValido = ValidUtils.isValidCpf(cpfGerado);
    }

    return cpfGerado;
}

const sortearDataNascimento = (): Date => {
    const dataInicio = new Date(1970, 0, 1);
    let dataFim = new Date();
    dataFim.setFullYear(dataFim.getFullYear() - 10);

    const timestampAleatorio = Math.random() * (dataFim.getTime() - dataInicio.getTime()) + dataInicio.getTime();

    return new Date(timestampAleatorio);
}

const sortearSalario = (): number => {
    const salario = Math.random() * (1000 - 10000) + 1000;
    return parseFloat(salario.toFixed(2));
}


const nomes: string[] = [ 'Maria', 'José', 'Ana', 'João', 'Antônio', 'Francisco', 'Carlos', 'Paulo', 'Pedro', 'Lucas' ];

const sobrenomes: string[] = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes' ];