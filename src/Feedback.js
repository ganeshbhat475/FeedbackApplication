import React, { Component } from 'react';
import feedbackImage from './Assets/feedbackImage.jpeg';
import './App.css';
import { connect } from 'react-redux';
import * as Actions from './ActionCreator';
import FeedbackModal from './FeedbackModal';


let modalContent;
class Feedback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Selectedindex: null,
            stage: 1
        }
        modalContent = {
            title: "Are you happy with our product?",
            content: <FeedbackModal handleClick={this.setInput} Selectedindex={this.state.Selectedindex} stage={this.state.stage} />,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.openModal(modalContent)
        }, 2000);
    }

    setInput = (index, stage) => {
        this.setState({ Selectedindex: index, stage, })
    }

    componentDidUpdate(prevState) {
        if ((prevState.stage !== this.state.stage) && this.state.stage !== 1) {
            const modalContent = {
                title: this.state.Selectedindex !== 2 ? "Thank you! A few more questions please..." :
                    "We are sorry we aren't very useful to you :(",
                content: <FeedbackModal handleClick={this.setInput} Selectedindex={this.state.Selectedindex}
                    sendFeedback={this.updateFeedback} />,
            }
            this.props.openModal(modalContent)
        }
    }

    componentWillUnmount() {
        this.props.closeModal(false)
    }

    updateFeedback = (data) => {
        const { Selectedindex } = this.state;
        let feedbackType = Selectedindex !== 2 ? "PlusFeedback" : "MinusFeedback"

        if (JSON.parse(localStorage.getItem(feedbackType)) !== null) {
            let existingArray = JSON.parse(localStorage.getItem(feedbackType))
            existingArray.push(data)
            return localStorage.setItem(feedbackType, JSON.stringify(existingArray))
        }

        else {
            let inputFeedback = [];
            inputFeedback.push(data);
            return localStorage.setItem(feedbackType, JSON.stringify(inputFeedback))
        }
    }

    handleClick = (e) => {
    }
    render() {
        const { ThanksMessage } = this.props;
        let BannerMessage = !ThanksMessage ? "Thank you for using our product. It is feedback time!" : "Thank you so much for your time!"
        return (<>
            <div className="App-header-style">
                <b className={ThanksMessage ? "alert alert-success bannerMessage" : "alert alert-primary bannerMessage"}>{BannerMessage}</b>
            </div>
            <div className="App-body-style">
                <img src={feedbackImage} alt="Feedback" className="img-fluid App-ImageStyle" />
                <button className="btn btn-primary secondFeedbackStyle" onClick={() => this.props.openModal(modalContent)}>Another feedback</button>
                <button className="btn btn-primary AllFeedBacksButton" onClick={() => this.props.history.push('/allFeedbacks')}>See all feedbacks</button>
            </div>
        </>
        )
    }
}
const mapStateToProps = state => ({
    ThanksMessage: state.ThanksMessage
})

const mapDispatchToProps = dispatch => ({
    openModal: (data) => { dispatch(Actions.openModal(data)) },
    closeModal: (showThanks) => { dispatch(Actions.closeModal(showThanks)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
