import React from "react";
import type { PessoaDto } from "../../services/dtos/pessoa.dto";
import { Document, Page, Text, View } from "@react-pdf/renderer"
import { FormatUtils } from "../../utils/format.utils";

type Props = {
    data: PessoaDto[];
}

const RelatorioPessoas: React.FC<Props> = ({ data }) => {
    return (
        <Document title={"Relatório de Pessoas"} >
            <Page size="A4" style={{ padding: '1cm', fontSize: '10px' }}>
                <View style={{ textAlign: 'center', marginBottom: '0.5cm' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: '14px' }}>Relatório de Pessoas</Text>
                </View>
                <View style={{ flexDirection: 'row', borderTop: '0.5px solid #000000', borderBottom: '0.5px solid #000000', padding: '2px 0' }} fixed>
                    <Text style={{ width: '10%', fontWeight: 'bold' }}>Índice</Text>
                    <Text style={{ width: '39%', fontWeight: 'bold' }}>Nome</Text>
                    <Text style={{ width: '17%', fontWeight: 'bold' }}>Cpf</Text>
                    <Text style={{ width: '17%', fontWeight: 'bold' }}>Data Nascimento</Text>
                    <Text style={{ width: '17%', textAlign: 'right', fontWeight: 'bold' }}>Salário</Text>
                </View>
                {data.map((pessoa, index) =>
                    <View style={{ flexDirection: 'row', backgroundColor: index%2===0 ? '#E3E3E3' : undefined, padding: '2px 0' }}>
                        <Text style={{ width: '10%' }}>{pessoa.indice}</Text>
                        <Text style={{ width: '39%' }}>{pessoa.nome}</Text>
                        <Text style={{ width: '17%' }}>{FormatUtils.cpf(pessoa.cpf)}</Text>
                        <Text style={{ width: '17%' }}>{FormatUtils.date(pessoa.dataNascimento)}</Text>
                        <Text style={{ width: '17%', textAlign: 'right' }}>{FormatUtils.currency(pessoa.salario)}</Text>
                    </View>
                )}
            </Page>
        </Document>
    )
}

export default RelatorioPessoas;