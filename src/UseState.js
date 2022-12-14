import React, { useEffect, useState } from "react";
const SECURITY_CODE = 'paradigma';

export const UseState = () => {
    const [state, setState] = useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    });
    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        });
    };
    
    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        });
    };
    
    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue
        });
    };
    
    const onCheck = () => {
        setState({
            ...state,
            error: false,
            loading: true
        });
    };

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        })
    };

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: ''
        })
    };

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
                <h2>Eliminar UseState</h2>
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
                    onChange={(event) => onWrite(event.target.value)}
                />
                <button
                    onClick={() => {
                            onCheck();
                        }}
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
                    onClick={() => {
                        onDelete();
                    }}
                >
                    Sí
                </button>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >
                    No
                </button>
            </>
        );
    } else {
        return (
            <>
                <p>Eliminado con éxito.</p>
                <button
                    onClick={() => {
                        onReset();
                    }}
                >
                    Reset
                </button>
            </>
        );
    }
};