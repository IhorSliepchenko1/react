import cl from "./CatalogButton.module.scss";
const CatalogButton = ({ fraction, fractionFunc }) => {
  return (
    <button
      onClick={() => fractionFunc()}
      className={`${cl.fractionClass} _btnFractionDef`}
    >
      {fraction}
    </button>
  );
};

export default CatalogButton;
