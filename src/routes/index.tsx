import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MenuPrincipal } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(()=> {
    setDrawerOptions([{
      label: 'Menu Principal',
      icon: 'home',
      path: 'pagina-inicial'
    },
    {
      label: 'Cadastro de Clientes',
      icon: 'person',
      path: 'cadastro-clientes'
    }]);
  },[]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<MenuPrincipal/>} />

      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};