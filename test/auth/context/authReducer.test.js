import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en el authReducer', () => {

  test('Debe de retornar el estado por defecto', () => {

    const initialState = {
      id: 123,
      user: 'Xanul'
    }

    const action = {
      type: ""
    }
    
    const test = authReducer(initialState, action);
    
    expect(initialState).toBe(test);

  });


})