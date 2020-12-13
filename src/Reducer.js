let initialState = {
    positiveSeries: ["What type of people do you  think would most benefit from our product?",
        "What is the main benefit you receive from us?",
        "How can we improve this product for you?"],
    negativeSeries: ["What can we build so that you'll find us useful?"],
    ThanksMessage: false
}

const Reducer = function (state = initialState, action) {
    switch (action.type) {
        case "OPEN_MODAL":
            return {
                ...state, showModal: true, modalTitle: action.payload.title,
                modalContent: action.payload.content, buttonName: action.payload.buttonName
            }
        case "CLOSE_MODAL":

            return { ...state, showModal: false, ThanksMessage: action.payload }
        default:
            return state;
    }
};

export default Reducer;