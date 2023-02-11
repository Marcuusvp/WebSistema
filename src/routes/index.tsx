import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DetalheDePessoas, ListagemDePessoas, MenuPrincipal, ListagemDeCidades, DetalheDeCidades } from '../pages';
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
    },
    {
      label: 'Cidades',
      icon: 'location_city',
      path: '/cidades'
    }]);
  },[]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<MenuPrincipal/>} />

      <Route path="/pessoas" element={<ListagemDePessoas/>}/>
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas/>}/>

      <Route path="/cidades" element={<ListagemDeCidades/>}/>
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades/>}/>

      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};