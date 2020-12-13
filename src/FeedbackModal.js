import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from './ActionCreator';
import './App.css';

const ButtonList = ["Very Much", "Slightly", "Don't care"]

class FeedbackModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feedbackInput: "",
            questionIndex: 0
        }
    }


    handleFeedback = (e) => {
        return this.setState({ feedbackInput: e.target.value })
    }

    handlePostFeedback = (questionIndex, skip) => {
        !skip && this.props.sendFeedback(this.state.feedbackInput)

        return this.setState({ questionIndex: questionIndex + 1, feedbackInput: "" }, () => {
            if (this.props.Selectedindex !== 2 ? this.state.questionIndex === this.props.positiveSeries.length : this.state.questionIndex === this.props.negativeSeries.length) {
                this.props.handleClick(this.props.Selectedindex, 1)
                this.props.closeModal(true)
            }
        })
    }


    render() {
        if (this.props.Selectedindex === null) {
            return (
                <div className="buttonGroupStyle">
                    {ButtonList.map((i, index) => <button key={index} name="initialFeedback" className="btn btn-primary" onClick={() => this.props.handleClick(index, 2)}>{i}</button>)}
                </div>)
        } else {
            return (<><div className="animateQuestion"><h5>{this.props.Selectedindex !== 2 ? this.props.positiveSeries[this.state.questionIndex] : this.props.negativeSeries[this.state.questionIndex]}</h5>
                <textarea className="container" onKeyDown={(e) => e.keyCode !== 8 ? (this.state.feedbackInput.length > 199 ? e.preventDefault() :true): {}} value={this.state.feedbackInput} onChange={this.handleFeedback} placeholder="please write here..."></textarea>
                <button className="btn btn-primary" name="postFeedback" onClick={() => this.handlePostFeedback(this.state.questionIndex)}>Post</button>
                <button className="btn btn-primary float-right" name="postFeedback" onClick={() => this.handlePostFeedback(this.state.questionIndex, true)}>Skip question</button> </div></>)

        }
    }
}

const mapStateToProps = state => ({
    positiveSeries: state.positiveSeries,
    negativeSeries: state.negativeSeries
})

const mapDispatchToProps = dispatch => ({
    closeModal: (showThanks) => { dispatch(Actions.closeModal(showThanks)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackModal)