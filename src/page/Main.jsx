import MyButton from "../components/UI/button/MyButton";

const Main = () => {
  const logout = () => {
    localStorage.removeItem(`userStatus`);
    location.reload();
  };
  return (
    <div>
      <h2>HELLO MAIN PAGE</h2>
      <MyButton text={`Выйти`} onClick={logout} />
    </div>
  );
};

export default Main;
