import React, { Component } from 'react'

class AllFeedbacks extends Component {
    render() {
        let PlusFeedbackData = JSON.parse(localStorage.getItem("PlusFeedback")) ? JSON.parse(localStorage.getItem("PlusFeedback")) : null;
        let MinusFeedbackData = JSON.parse(localStorage.getItem("MinusFeedback")) ? JSON.parse(localStorage.getItem("MinusFeedback")) : null;
        return (
            <>
                <a href='/#' className="BackIcon" onClick={() => this.props.history.goBack(-1)}>Back</a>
                <br /><br />
                <h3>All anonymous feedbacks:</h3>
                <table class="table table-striped ">
                    <thead>
                        <tr>
                            <th>Appreciation Feedbacks:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PlusFeedbackData ? PlusFeedbackData.map((i, index) => {
                            return (<tr key={index}>
                                <td>{i}</td>
                            </tr>)
                        }) : <i><br />No feedback entered yet.</i>
                        }
                    </tbody>
                </table>

                <table class="table table-striped ">
                    <thead>
                        <tr>
                            <th>Feedbacks for improvements:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MinusFeedbackData ? MinusFeedbackData.map((i, index) => {
                            return (<tr key={index}>
                                <td>{i}</td>
                            </tr>)
                        }) : <i><br />No feedback entered yet.</i>
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export default AllFeedbacks
