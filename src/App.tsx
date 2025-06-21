import './App.css';
import { InputText } from "primereact/inputtext";
import { useState } from 'react';
import { Button } from 'primereact/button';
import { PessoaService } from './services/backend/pessoa.service';
import { SwalUtils } from './utils/swal.utils';
import { Message } from 'primereact/message';
import { ProgressBar } from 'primereact/progressbar';
import { PdfUtils } from './utils/pdf.utils';
import RelatorioPessoas from './reports/RelatorioPessoas';

function App() {
  const [numRegistros, setNumRegistros] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [percentLoading, setPercentLoading] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWatingRequest, setIsWatingRequest] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = Number(event.target.value);
    setNumRegistros(inputNumber);
    setError(
      inputNumber < 1 ? 'O número mínimo de registros é 1' :
      inputNumber > 10000 ? 'O número máximo de registros é 10000' : ''
    );
  };

  const handleGeneratePdfClick = async () => {
    if (!error) {
      setIsLoading(true);
      setIsWatingRequest(true);
      setPercentLoading(0);
      try {
        const pessoaService = new PessoaService();
        const data = await pessoaService.getPessoaList(numRegistros);

        setIsWatingRequest(false);

        PdfUtils.gerar(<RelatorioPessoas data={data}/>)

        console.log(data);
      } catch (error) {
        console.error(error);
        SwalUtils.swalError();
        setIsWatingRequest(false);
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-column gap-2">
      <h1 className='mb-5'>Gerador de relatório de pessoas aleatórias</h1>
      <label htmlFor="registers">Quantidade de Registros</label>
      <InputText
        keyfilter="int" 
        placeholder="Integers"
        value={numRegistros.toString()}
        onChange={handleChange}
        invalid={!!error}
      />
      {!!error && <Message severity="error" text={error} /> }
      <Button 
        className='custom-button mt-5' 
        severity="info" 
        label="Gerador relatório" 
        icon="pi pi-print" 
        loading={isLoading}
        onClick={handleGeneratePdfClick} 
      />
      {!!isLoading && 
        <ProgressBar 
          className='mt-5'
          value={percentLoading}
          mode={ isWatingRequest ? 'indeterminate' : 'determinate' }
          style={{ height: isWatingRequest ? '6px' : undefined }}
        />
      }
    </div>
  )
}

export default App;
