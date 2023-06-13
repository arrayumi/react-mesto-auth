import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import AddPlacePopup from './AddPlacePopup.js';



function App() {
    const [cards, setCards] = useState([]);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getCards()
        ])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);;
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);;
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(err));
    }

    function handleCardDelete(_id) {
        api.deleteItem(_id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== _id));
            })
            .catch(err => console.log(err));
    }

    function handleUpdateUser(userInfo) {
        api.setUserInfo(userInfo)
            .then((newInfo) => {
                setCurrentUser(newInfo);
            })
            .then(() => closeAllPopups())
            .catch(err => console.log(err));
    }

    function handleUpdateAvatar(avatar) {
        api.setUserAvatar(avatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar)
            })
            .then(() => closeAllPopups())
            .catch(err => console.log(err));
    }

    function handleAddPlaceSubmit(card) {
        api.addItem(card)
            .then((newCard )=> {setCards([newCard, ...cards])})
            .then(() => closeAllPopups())
            .catch(err => console.log(err));
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete} />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <PopupWithForm
                    title={"Вы уверены?"}
                    name={"confirmation"}
                    onClose={closeAllPopups}
                    buttonText={"Да"}>
                </PopupWithForm>

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups} />

                <Footer />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
