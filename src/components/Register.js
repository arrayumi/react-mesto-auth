import Header from "./Header";
import { Link } from "react-router-dom";

function Register() {
    return (
        <>
            <Header>
                <Link to="/sign-in" className="header__menu-item">Войти</Link>
            </Header>
            <main className="page__element login">
                <h2 className="login__title">Регистрация</h2>
                <form className="login__form">
                    <label className="login__field">
                        <input className="login__input" type="email" placeholder="Email"
                            name="email" required />
                    </label>
                    <label className="login__field">
                        <input className="login__input" type="password"
                            placeholder="Пароль" name="password" required />
                    </label>
                    <button className="login__button" type="submit">Зарегистрироваться</button>
                </form>
                <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
            </main>
        </>
    )
}

export default Register;