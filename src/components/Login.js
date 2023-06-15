import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = formValue;
        handleLogin({ email, password });
    }


    return (
        <>
            <Header>
                <Link to="/sign-up" className="header__menu-item">Регистрация</Link>
            </Header>
            <main className="page__element login">
                <h1 className="login__title">Вход</h1>
                <form className="login__form" onSubmit={handleSubmit}>
                    <label className="login__field">
                        <input className="login__input" type="email" placeholder="Email"
                            name="email" required value={formValue.email} onChange={handleChange} />
                    </label>
                    <label className="login__field">
                        <input className="login__input" type="password"
                            placeholder="Пароль" name="password" required value={formValue.password} onChange={handleChange} />
                    </label>
                    <button className="login__button" type="submit">Войти</button>
                </form>
            </main>
        </>
    )
}

export default Login;