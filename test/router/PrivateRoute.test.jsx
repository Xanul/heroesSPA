import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../src/auth"
import { PrivateRoute } from "../../src/router/PrivateRoute"



describe('Pruebas en el <PrivateRoute/>', () => {

  test('Debe de mostrar el children si el usuario SI esta autenticado', () => {

    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'Juan Carlos'
      }
    }

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Esto es una ruta privada</h1>  
          </PrivateRoute>
        </MemoryRouter> 
      </AuthContext.Provider>
    );

    expect(screen.getByText('Esto es una ruta privada')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/search?q=batman");

  })

})