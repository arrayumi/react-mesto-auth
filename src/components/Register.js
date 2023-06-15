import { useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import * as auth from '../utils/auth.js';


function Register({handleInfoMessage, handleInfoTooltipOpen}) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

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
        auth.register({ email, password })
            .then((res) => {
                navigate('/sign-in', { replace: true });
                handleInfoTooltipOpen();
                handleInfoMessage(true);
            }
            )
            .catch((err) => {
                console.log(err);
                handleInfoMessage(false);
            });
    }

    return (
        <>
            <Header>
                <Link to="/sign-in" className="header__menu-item">Войти</Link>
            </Header>
            <main className="page__element login">
                <h1 className="login__title">Регистрация</h1>
                <form className="login__form" onSubmit={handleSubmit}>
                    <label className="login__field">
                        <input className="login__input" type="email" placeholder="Email"
                            name="email" required value={formValue.email} onChange={handleChange} />
                    </label>
                    <label className="login__field">
                        <input className="login__input" type="password"
                            placeholder="Пароль" name="password" required value={formValue.password} onChange={handleChange} />
                    </label>
                    <button className="login__button" type="submit">Зарегистрироваться</button>
                </form>
                <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
            </main>
        </>
    )
}

export default Register;