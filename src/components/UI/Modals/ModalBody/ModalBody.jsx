import InputModal from "../../input/inputModal/inputModal";
import cl from "./ModalBody.module.scss";
import closeModal from "./../../../../assets/closeModal.png";

const ModalBody = ({ handleChange, containerRef, setModal, text }) => {
  const arrPlaceholder = [`theme`, `user name`, `desc`];

  const closeModalFn = () => {
    setModal(false);
    console.log(`modal close`);
  };

  const clearInputs = () => {
    for (let i = 0; i < containerRef.current.childNodes.length; i++) {
      containerRef.current.childNodes[i].value = "";
    }
  };

  return (
    <div className={cl.modalContainer}>
      <div className={cl.modal}>
        <div className={cl.cross} onClick={closeModalFn}>
          <img src={closeModal} alt="closeModal" className={cl.closeModal} />
        </div>
        <div>
          <div className={cl.inputContainer} ref={containerRef}>
            {arrPlaceholder.map((item) => (
              <InputModal key={item} placeholder={item} classname={cl.input} />
            ))}
          </div>

          <div className={cl.btnContainer}>
            <button className={cl.clear} onClick={clearInputs}>
              clear-all
            </button>

            <button
              className={cl.add}
              onClick={(e) => {
                handleChange(e);
              }}
            >
              {text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBody;
