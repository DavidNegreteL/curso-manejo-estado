import React from "react";

export class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false
        }
    };

    componentDidUpdate() {
        if (this.state.loading) {
            setTimeout(() => {
                this.setState({loading: false})
            }, 3000);
        }
    };

    render() {
        return (
            <div>
                <h2>Eliminar ClassState</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {
                    this.state.error && (
                        <p>Error: el código es incorrecto</p>
                    )
                }
                {
                    this.state.loading && (
                        <p>Cargando...</p>
                    )
                }
                <input placeholder="Código de seguridad"/>
                <button
                    onClick={() => this.setState(prevState => ({loading: !prevState.loading}))}
                >
                    Comprobar
                </button>
            </div>
        )
    }
}