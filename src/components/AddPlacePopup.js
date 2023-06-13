import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ onClose, isOpen, onAddPlace }) {

    const cardNameInputRef = useRef();
    const cardLinkInputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: cardNameInputRef.current.value,
            link: cardLinkInputRef.current.value,
        });
    }

    useEffect(() => {
        cardNameInputRef.current.value = '';
        cardLinkInputRef.current.value = '';
    }, [isOpen])

    return (
        <PopupWithForm
            title={"Новое место"}
            name={"add-card"}
            onClose={onClose}
            isOpen={isOpen}
            buttonText={"Создать"}
            onSubmit={handleSubmit}>
            <>
                <label className="popup__field">
                    <input id="input-name" className="popup__input popup__input_type_name" type="text"
                        placeholder="Название" name="name" required minLength="2" maxLength="30" ref={cardNameInputRef} />
                    <span id="input-name-error" className="popup__input-error"></span>
                </label>
                <label className="popup__field">
                    <input id="input-url" className="popup__input popup__input_type_url" type="url"
                        placeholder="Ссылка на картинку" name="link" required ref={cardLinkInputRef} />
                    <span id="input-url-error" className="popup__input-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}