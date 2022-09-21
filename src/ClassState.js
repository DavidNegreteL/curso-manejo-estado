import React from "react";
const SECURITY_CODE = 'paradigma';
export class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false
        }
    };

    componentDidUpdate() {
        if (this.state.loading) {
            setTimeout(() => {
                if(SECURITY_CODE === this.state.value) {
                    this.setState({error: false, loading: false})
                } else {
                    this.setState({error: true, loading: false})
                }
            }, 3000);
        }
    };

    render() {
        return (
            <div>
                <h2>Eliminar ClassState</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {
                    (this.state.error && !this.state.loading) && (
                        <p>Error: el código es incorrecto</p>
                    )
                }
                {
                    this.state.loading && (
                        <p>Cargando...</p>
                    )
                }
                <input 
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({value: event.target.value})
                    }}
                />
                <button
                    onClick={() => this.setState(prevState => ({loading: !prevState.loading}))}
                >
                    Comprobar
                </button>
            </div>
        )
    }
}