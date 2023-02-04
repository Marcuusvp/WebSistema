import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ListagemDePessoas, MenuPrincipal } from '../pages';
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
      label: 'Clientes',
      icon: 'people',
      path: '/pessoas'
    }]);
  },[]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<MenuPrincipal/>} />

      <Route path="/pessoas" element={<ListagemDePessoas/>}/>
      {/* <Route path="/cidades/detalhe/:id" element={<>CIDADES por id</>}/> */}

      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};