function InfoTooltip({ isOpen, onClose, infoMessage }) {
    return (
        <div className={`popup popup_type_reg-info ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <h2 className="popup__title">
                    {infoMessage}
                </h2>
                <button className="popup__button popup__button_type_close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;