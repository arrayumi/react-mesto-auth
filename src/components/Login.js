import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Login() {

    const [formValue, setFormValue] = useState('');



    return (
        <>
            <Header>
                <Link to="/sign-up" className="header__menu-item">Регистрация</Link>
            </Header>
            <main className="page__element login">
                <h2 className="login__title">Вход</h2>
                <form className="login__form">
                    <label className="login__field">
                        <input className="login__input" type="email" placeholder="Email"
                            name="email" required />
                    </label>
                    <label className="login__field">
                        <input className="login__input" type="password"
                            placeholder="Пароль" name="password" required />
                    </label>
                    <button className="login__button" type="submit">Войти</button>
                </form>
            </main>
        </>
    )
}

export default Login;