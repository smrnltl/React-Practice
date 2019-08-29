import React, { Component } from 'react';


class FlashMessage extends Component {

    handleClose = (id) => {
        this.props.clearMessage(id);
    }
    componentDidMount() {
        setTimeout(() => {
            this.handleClose(this.props.message.id);
        }, 5000)
    }
    render() {
        const { id, type, msg } = this.props.message;
        const style = 'alert ' + (type === 'success' ? 'alert-success' : 'alert-danger');

        return (

            <div key={id} className={style} role="alert">
                {msg}
                <button type="button" className="close" onClick={() => this.handleClose(id)} >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

        );
    }
}

export default FlashMessage;