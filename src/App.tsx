/* eslint-disable linebreak-style */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './shared/forms/TraducoesYup';
import { AppRoutes } from './routes';
import { Login, MenuLateral } from './shared/components';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';
import { Provider } from 'react-redux';
import store from './store';



export const App = () => {
  return (    
    <Provider store={store}>
      <AuthProvider>      
        <AppThemeProvider>

          <Login>

            <DrawerProvider>

              <BrowserRouter>

                <MenuLateral>
                  <AppRoutes />
                </MenuLateral>
        
              </BrowserRouter>
            </DrawerProvider>

          </Login>

        </AppThemeProvider>
      </AuthProvider>
    </Provider>    
  );
};