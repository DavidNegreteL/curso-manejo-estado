import React, { useEffect, useState } from "react";

export const UseState = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    }, [loading]);

    return (
        <div>
            <h2>Eliminar UseState</h2>
            <p>Por favor, escribe el código de seguridad.</p>
            {
                error && (
                    <p>Error: El código es incorrecto</p>
                )
            }
            {
                loading && (
                    <p>Cargando...</p>
                )
            }
            <input placeholder="Código de seguridad"/>
            <button
                onClick={() => setLoading(true)}
            >
                Comprobar
            </button>
        </div>
    );
};