import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleDrawerOpen } = useDrawerContext();
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button onClick={toggleDrawerOpen} variant='contained' color='primary'>Teste</Button>} />

      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};