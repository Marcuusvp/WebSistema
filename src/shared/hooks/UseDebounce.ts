import { useCallback, useRef } from 'react';
/**
 * Custom hook, trata o campo de pesquisa para não dar hit no DB a cada digitação, apenas após pararmos de digitar.
 * Deve ser passado com parametro o delay desejado e um boolean que define se terá delay ao abrir a pagina ou não.
 */
export const useDebounce = (delay = 2000, notDelayInFirstTime = true) => {
  const isFirstTime = useRef(notDelayInFirstTime);//prop para listar logo de cara a consulta ao abrir a pagina.
  const debouncing = useRef<NodeJS.Timeout>();

  const debounce = useCallback((func: () => void) => {
    if(isFirstTime.current){
      isFirstTime.current = false;
      func();
    } else {
      if(debouncing.current){
        clearTimeout(debouncing.current);
      }
      debouncing.current = setTimeout(() => func() ,delay);    
    }
  },[delay]);
  
  return {debounce};
};