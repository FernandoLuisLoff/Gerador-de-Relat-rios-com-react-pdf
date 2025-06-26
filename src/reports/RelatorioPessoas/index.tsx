import React, { useMemo } from "react";
import type { PessoaDto } from "../../services/dtos/pessoa.dto";
import { Document, Page, Text, View } from "@react-pdf/renderer"
import { FormatUtils } from "../../utils/format.utils";

type Props = {
    data: PessoaDto[];
}


const TITLE = "Relatório de Pessoas";

const PAGE_SIZE = 48;

const RelatorioPessoas: React.FC<Props> = ({ data }) => {
    const pages = useMemo(() => {
        const page = [];
        for (let i = 0; i < data.length; i += PAGE_SIZE) {
            page.push(data.slice(i, i + PAGE_SIZE));
        }
        return page;
    }, [data])

    return (
        <Document title={TITLE}>
            {pages.map((page) => (
                <Page size="A4" style={{ padding: '1cm', fontSize: '10px' }}>
                    <View style={{ textAlign: 'center', marginBottom: '0.5cm' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: '14px' }}>{TITLE}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', borderTop: '0.5px solid #000000', borderBottom: '0.5px solid #000000', padding: '2px 0' }}>
                        <Text style={{ width: '10%', fontWeight: 'bold' }}>Índice</Text>
                        <Text style={{ width: '39%', fontWeight: 'bold' }}>Nome</Text>
                        <Text style={{ width: '17%', fontWeight: 'bold' }}>Cpf</Text>
                        <Text style={{ width: '17%', fontWeight: 'bold' }}>Data Nascimento</Text>
                        <Text style={{ width: '17%', textAlign: 'right', fontWeight: 'bold' }}>Salário</Text>
                    </View>
                    {page.map((pessoa, index) =>
                        <View key={index} style={{ flexDirection: 'row', backgroundColor: index%2===0 ? '#E3E3E3' : undefined, padding: '2px 0' }}>
                            <Text style={{ width: '10%' }}>{pessoa.indice}</Text>
                            <Text style={{ width: '39%' }}>{pessoa.nome}</Text>
                            <Text style={{ width: '17%' }}>{FormatUtils.cpf(pessoa.cpf)}</Text>
                            <Text style={{ width: '17%' }}>{FormatUtils.date(pessoa.dataNascimento)}</Text>
                            <Text style={{ width: '17%', textAlign: 'right' }}>{FormatUtils.currency(pessoa.salario)}</Text>
                        </View>
                    )}
                    <View style={{ position: 'absolute', textAlign: 'center', bottom: '0.5cm', width: '19cm' }} >
                        <Text style={{ fontWeight: 'bold', fontSize: '8px' }} render={(page) => `${page.pageNumber}`}
                        />
                    </View>
                </Page>
            ))}
        </Document>
    )
}

export default RelatorioPessoas;