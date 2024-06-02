import AlertModal from "../AlertModal/AlertModal";
import ModalBody from "../ModalBody/ModalBody";

const EditModal = ({ setModal, alert, handleChange, containerRef }) => {
  return (
    <>
      <ModalBody
        handleChange={handleChange}
        setModal={setModal}
        containerRef={containerRef}
        text={`save`}
      />

      {alert && <AlertModal text={`Заполните все поля`} />}
    </>
  );
};

export default EditModal;
