import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../src/auth"
import { Navbar } from "../../../src/ui/components/Navbar"

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate

}));

describe('Pruebas en el <Navbar/>', () => {

  const contextValue = {
    logged: true,
    user: {
      id: 'ABC',
      name: 'Xanul060'
    },
    logout: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks());

  test('Debe de mostrar el nombre del usuario ', () => {

    
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar/>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText(contextValue.user.name)).toBeTruthy();

  })

  test('Debe de llamar el logout y navigate cuando se hace click en el boton', () => {

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar/>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const logoutBtn = screen.getByRole('button');
    fireEvent.click(logoutBtn);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
    
    


  })

})