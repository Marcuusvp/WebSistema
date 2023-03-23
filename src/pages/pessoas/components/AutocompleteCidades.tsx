import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { CidadesServices } from '../../../shared/services/cidades/CidadesServices';

type TAutocompleteOption = {
    id: number,
    label: string,
}

interface IAutoCompleteCidadeProps{
  isExternalLoading: boolean;
}
export const AutocompleteCidades: React.FC<IAutoCompleteCidadeProps> = ({isExternalLoading = false}) => {
  const [opcoes, setOpcoes] = useState<TAutocompleteOption[]>([]);
  const {debounce} = useDebounce();
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState('');
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');
  const [selectedId, setSelectedId] = useState<number|undefined>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue:() =>selectedId, 
      setValue:(e, newSelectedId) => setSelectedId(newSelectedId)});
  },[registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesServices.getAll(1).then((result) => {
        setIsLoading(false);
        if(result instanceof Error){
          alert(result.message);
          return;
        }
        setOpcoes(result.data.map(cidade => ({id: cidade.id, label: cidade.nome})));
      });
    });
  },[busca]);

  const autoCompleteSelectedOption = useMemo(() => {
    if(!selectedId) return null;

    const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
    if(!selectedOption) return null;

    return selectedOption;
  },[selectedId, opcoes]);

  return(
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'
      disablePortal
      loading={isLoading}
      value={autoCompleteSelectedOption}
      disabled={isExternalLoading}
      popupIcon={(isExternalLoading || isLoading)? <CircularProgress size={28}/> : undefined}
      onChange={(e, newValue)=> {setSelectedId(newValue?.id); setBusca(''); clearError();}}
      onInputChange={(e, newValue) => setBusca(newValue)}
      options={opcoes}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}/>
      )}
    />
  );
};