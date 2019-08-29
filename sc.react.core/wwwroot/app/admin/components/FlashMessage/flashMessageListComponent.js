import { connect } from 'react-redux';
import FlashMessage from './flashMessageComponent';
import React, { Component } from 'react';
import { clearMessage } from '../../actions/uiAction';
import { Animated } from "react-animated-css";

class FlashMessageList extends Component {

    removeMsg = (id) => {
        this.props.clearMessage(id);
    }
    render() {
        const messages = this.props.message.map((message) => {
            return (
                
                    <Animated animationIn="slideInRight" key={message.id} animationOut="fadeOut">
                        <FlashMessage key={message.id} message={message} clearMessage={this.removeMsg} />
                    </Animated>
            );
        })
        return (
            <div className = "flashmsg">{messages}</div>
        );
    }
}

const mapStateToProps = state => ({
    message: state.ui
})


export default connect(mapStateToProps, { clearMessage })(FlashMessageList);

