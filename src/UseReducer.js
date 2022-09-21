import React, { useEffect,useReducer } from "react";
import { act } from "react-dom/test-utils";

const SECURITY_CODE = 'paradigma';

function UseReducer() {
    
    const actionTypes = {
        confirm: 'CONFIRM',
        error: 'ERROR',
        write: 'WRITE',
        check: 'CHECK',
        delete: 'DELETE',
        reset: 'RESET'
    };

    const reducerObject = (state, payload) => ({
        [actionTypes.confirm]: {
            ...state,
            error: false,
            loading: false,
            confirmed: true
        },
        [actionTypes.error]: {
            ...state,
            error: true,
            loading: false
        },
        [actionTypes.write]: {
            ...state,
            value: payload
        },
        [actionTypes.check]: {
            ...state,
            error: false,
            loading: true
        },
        [actionTypes.delete]: {
            ...state,
            deleted: true,
        },
        [actionTypes.reset]: {
            ...state,
            confirmed: false,
            deleted: false,
            value: ''
        }
    });

    const reducer = (state, action) => {
        if(reducerObject(state)[action.type]) {
            return reducerObject(state, action.payload)[action.type];
        } else {
            return state;
        }
    }
    const initialState = {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    }
    const [state, dispatch]  = useReducer(reducer, initialState);
    
    const onConfirm = () => dispatch({type: actionTypes.confirm});
    
    const onError = () => dispatch({type: actionTypes.error});
    
    const onWrite = ({target: {value}}) => dispatch({type: actionTypes.write, payload: value});
    
    const onCheck = () => dispatch({type: actionTypes.check});

    const onDelete = () => dispatch({type: actionTypes.delete});

    const onReset = () => dispatch({type: actionTypes.reset});

    useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                if(state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }
            }, 3000);
        }
    }, [state.loading]);

    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>Eliminar UseReducer</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {
                    state.error && (
                        <p>Error: El código es incorrecto</p>
                    )
                }
                {
                    state.loading && (
                        <p>Cargando...</p>
                    )
                }
                <input 
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={ onWrite }
                />
                <button
                    onClick={() => onCheck() }
                >
                    Comprobar
                </button>
            </div>
        );
    } else if (state.confirmed && !state.deleted) {
        return (
            <>
                <p>Estado de confirmación</p>
                <button
                    onClick={ onDelete }
                >
                    Sí
                </button>
                <button
                    onClick={onReset}>
                    No
                </button>
            </>
        );
    } else {
        return (
            <>
                <p>Eliminado con éxito.</p>
                <button onClick={onReset}>
                    Reset
                </button>
            </>
        );
    }
}

export {UseReducer};