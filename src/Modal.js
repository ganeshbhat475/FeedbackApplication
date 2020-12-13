import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from './ActionCreator';
import './Modal.css';

export class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false
        }
    }


    handleModalClose = () => {
        this.props.closeModal()
    }

    render() {
        let style = { display: "block" }
        if (!this.props.show) {
            return null;
        }
        return (<>
            <div className="modal" style={style}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title ">{this.props.title}</h5>
                            <button type="button" className="close" onClick={this.handleModalClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.content}
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

const mapStateToProps = state => ({
    show: state.showModal,
    title: state.modalTitle,
    content: state.modalContent
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => { dispatch(Actions.closeModal()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
