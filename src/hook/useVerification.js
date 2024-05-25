import { useRef, useState } from "react";
import { user } from "../components/data/loginData";

export const useVerification = () => {
     const login = useRef(null);
     const password = useRef(null);
     const [modal, setModal] = useState(false);
     const [text, setText] = useState('');

     const handleInfo = () => {
          switch (true) {

               case login.current.value.length < 1 && password.current.value.length < 1:
                    setText("Введите логин и пароль")
                    setModal(true);
                    break;

               case login.current.value === user.login &&
                    password.current.value === user.password:
                    setText("Добро пожаловать")
                    setModal(true);
                    break;

               case login.current.value !== user.login ||
                    password.current.value !== user.password:
                    setText("Неверные данные")
                    setModal(true);
                    break;

               default:
                    setText("Неверный логин и пароль")
                    setModal(true);
                    break;
          }
     };

     return { login, password, handleInfo, modal, setModal, text }
}