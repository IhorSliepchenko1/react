import FractionUI from "../FractionUI/FractionUI";
import CatalogButton from "../button/CatalogButton/CatalogButton";
import cl from "./Catalog.module.scss";

const Catalog = ({ containerPosts }) => {
  const countFrac = (fr) => {
    containerPosts.current.style = `grid-template-columns: ${fr};`;
  };
  return (
    <div className={cl.container}>
      <CatalogButton
        fraction={<span className="_1fr"></span>}
        fractionFunc={() => {
          countFrac(`1fr`);
        }}
      />
      <CatalogButton
        fraction={<FractionUI count={2} />}
        fractionFunc={() => countFrac(`1fr 1fr`)}
      />
      <CatalogButton
        fraction={<FractionUI count={3} />}
        fractionFunc={() => countFrac(`1fr 1fr 1fr`)}
      />
      <CatalogButton
        fraction={<FractionUI count={4} />}
        fractionFunc={() => countFrac(`1fr 1fr 1fr 1fr`)}
      />
    </div>
  );
};

export default Catalog;
