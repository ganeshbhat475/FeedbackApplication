export const openModal = (data) => ({
    type: "OPEN_MODAL",
    payload: data
})

export const closeModal = (showThanks) => ({
    type: "CLOSE_MODAL",
    payload:showThanks
})