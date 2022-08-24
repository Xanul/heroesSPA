import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";





describe('Pruebas en el <AppRouter/>', () => {

  test('Debe de mostrar el login si el usuario no esta autenticado', () => {

    const contextValue = {
      logged: false
    }

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter/>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getAllByText('Login').length).toBe(2);

  });

  test('Debe de mostrar el componente de marvel si esta autenticado', () => {

    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'Rivas'
      }
    }

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter/>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Spider Man')).toBeTruthy();
    expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);

  })

})