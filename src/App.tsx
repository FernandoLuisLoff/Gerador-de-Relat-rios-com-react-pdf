import './App.css';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { useState } from 'react';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

function App() {
  const [numRegistros, setNumRegistros] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = Number(event.target.value);
    setNumRegistros(inputNumber);
    setError(
      inputNumber < 1 ? 'O número mínimo de registros é 1' :
      inputNumber > 10000 ? 'O número máximo de registros é 10000' : ''
    );
  };

  const handleGeneratePdfClick = () => {
    setIsLoading(true);
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
      {!!error && <Tag icon="pi pi-times" severity="danger" value={error} /> }
      <Button 
        className='custom-button mt-5' 
        severity="info" 
        label="Gerador relatório" 
        icon="pi pi-print" 
        loading={isLoading}
        onClick={handleGeneratePdfClick} 
      />
    </div>
  )
}

export default App;
