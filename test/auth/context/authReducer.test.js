import { authReducer, types } from "../../../src/auth";


describe('Pruebas en el authReducer', () => {

  test('Debe de retornar el estado por defecto', () => {

    const state = authReducer({logged: false}, {});

    expect(state).toEqual({logged: false});

  });

  test('Debe de llamar el login y establecer el usuario', () => {

    const user = {
      id: '123',
      user: 'Rodrigo'
    }

    const action = {
      type: types.login,
      payload: user
    }

    const state = authReducer({logged: false}, action);

    expect(state).toEqual({
      logged: true,
      user: action.payload
    });

  });

  test('Debe de borrar el name del usuario y cambiar el logged a false', () => {

    const initialState = {
      logged: true,
      user: {
        id: '123',
        name: 'Jorge'
      }
    }

    const action = {
      type: types.logout
    }

    const newState = authReducer(initialState, action);
    expect(newState).toEqual({logged: false})

  })


})