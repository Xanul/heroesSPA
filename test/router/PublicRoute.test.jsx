import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";



describe('Pruebas en <PublicRoute />', () => {

  test('Si no esta autenticado el usuario debe de mostrar el children', () => {

    const contextValue = {
        logged: false
    }

    render(
      <AuthContext.Provider value={ contextValue }>
        <PublicRoute>
          <h1>Esto es una ruta publica</h1>  
        </PublicRoute> 
      </AuthContext.Provider>
    )

    expect(screen.getByText('Esto es una ruta publica')).toBeTruthy();

  });

  test('Debe de navegar si el usuario esta autenticado', () => {

    const contextValue = {
      logged: true,
      user: {
        name: 'Strider',
        id: 'ABC'
      }
    }

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/login']}>

          <Routes>
            <Route path='marvel' element={<h1>Pagina Marvel</h1>}></Route>
            <Route path='login' element={ 
              <PublicRoute>
                <h1>Esto es una ruta publica</h1>  
              </PublicRoute> }>  
            </Route>
          </Routes>

         
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Pagina Marvel')).toBeTruthy();

  });

})