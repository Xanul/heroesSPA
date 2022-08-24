import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', ()=> ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));


describe('Pruebas en el <SearchPage/>', () => {

  beforeEach(() => jest.clearAllMocks());

  test('Debe de mostrarse correctamente con valores por defecto', () => {

    const {container} = render (
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )

    // expect(container).toMatchSnapshot();

  })

  test('Debe de mostrarse a Batman y el input con el valor del queryString', () => {

    render (
      <MemoryRouter initialEntries={['/seatch?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )

    const inputValue = screen.getByRole('textbox');
    expect(inputValue.value).toBe('batman');
    
    const img = screen.getByRole('img');
    expect(img.src).toContain("/assets/dc-batman.jpg");

    const noHeroDiv = screen.getByLabelText('noHeroDiv');
    
    expect(noHeroDiv.style.display).toBe('none');

  })

  test('Debe de mostrar un error si no se encuentra el heroe (batman123)', () => {

    render (
      <MemoryRouter initialEntries={['/seatch?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )

    expect(screen.getByText('No hero with')).toBeTruthy();
    const noHeroDiv = screen.getByLabelText('noHeroDiv');
    expect(noHeroDiv.style.display).toBe('');

  })

  test('Debe de llamar el navigate a la pantalla nueva', () => {

    render (
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )
    
    // const searchBtn = screen.getByRole('button');
    // fireEvent.click(searchBtn);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target: {value: "Superman"}});
    
    // expect(input.value).toBe('Goku');

    const testForm = screen.getByRole('form', {name: "form"});
    fireEvent.submit(testForm);
    
    expect(mockedUseNavigate).toHaveBeenCalledWith('?q=Superman');



  })

})