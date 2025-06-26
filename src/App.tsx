import './App.css';
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { PessoaService } from './services/backend/pessoa.service';
import { SwalUtils } from './utils/swal.utils';
import { Message } from 'primereact/message';
import { PdfUtils } from './utils/pdf.utils';
import RelatorioPessoas from './reports/RelatorioPessoas';
import { ThemeEnum } from './types';
import { ThemeLocalStorage } from './services/localStorage/theme.localStorage';

function App() {
  const themeLocalStorage = new ThemeLocalStorage();

  const [themeMode, setThemeMode] = useState<ThemeEnum>(themeLocalStorage.get());
  const [numRegistros, setNumRegistros] = useState<number>(1);
  const [error, setError] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const link = document.getElementById('theme-link') as HTMLLinkElement;

    switch (themeMode) {
      case ThemeEnum.LIGHT:
        link.href = "node_modules/primereact/resources/themes/lara-light-cyan/theme.css";
        break;
      case ThemeEnum.DARK:
        link.href = "node_modules/primereact/resources/themes/lara-dark-cyan/theme.css";
        break;
    }
  }, [themeMode])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MIN_VALUE = 1;
    const MAX_VALUE = 100000;

    const inputNumber = Number(event.target.value);
    setNumRegistros(inputNumber);
    setError(
      inputNumber < MIN_VALUE ? `O número mínimo de registros é ${MIN_VALUE}` :
      inputNumber > MAX_VALUE ? `O número máximo de registros é ${MAX_VALUE}` : ''
    );
  };

  const handleGeneratePdfClick = async () => {
    try {
      if (!!error) return;

      setIsLoading(true);

      const pessoaService = new PessoaService();
      const data = await pessoaService.getPessoaList(numRegistros);

      await PdfUtils.gerar(
        <RelatorioPessoas 
          data={data}
        />
      )
    } catch (error) {
      console.error(error);
      SwalUtils.swalError();
    } finally {
      setIsLoading(false);
    }
  }

  const toggleTheme = () => {
    const theme = themeMode === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    setThemeMode(theme);
    themeLocalStorage.set(theme);
  }

  return (
    <div className={`app-container ${themeMode}`}>
      <i className={`icon-theme pi ${themeMode === ThemeEnum.DARK ? 'pi-sun' : 'pi-moon'}`} 
        title={`${themeMode === ThemeEnum.DARK ? 'Tema claro' : 'Tema escuro'}`} 
        onClick={toggleTheme} 
      />
      <h1 className='mb-5'>Gerador de relatório de pessoas aleatórias</h1>
      <label className='mb-2' htmlFor="registers">Quantidade de Registros</label>
      <InputText
        keyfilter="int"
        placeholder="Integers"
        value={numRegistros.toString()}
        onChange={handleChange}
        invalid={!!error}
      />
      {!!error && <Message className='mt-2' severity="error" text={error} /> }
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
