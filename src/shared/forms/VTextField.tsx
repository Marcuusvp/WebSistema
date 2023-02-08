import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useState } from 'react';

//type para habilitar a possibilidade de receber as props do TextField do MUI mais as nossas novas props customizadas.
type TVTextFieldProps = TextFieldProps &{
  name: string;
};
/**
 * Componente customizado, baseado no Material-UI
 */
export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError} = useField(name);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (e, newValue) => setValue(newValue),
    });
  },[registerField, fieldName, value]);

  return(
    <TextField
      {...rest}

      error={!!error}
      helperText={error}
      defaultValue={defaultValue}

      value={value}
      onChange={e => {setValue(e.target.value); rest.onChange?.(e);}}

      onKeyDown={(e) => {error && clearError(); rest.onKeyDown?.(e);}}
    />
  );
};