import "./Pagination.scss";
import { useEffect, useState } from "react";
import { getPagesArray } from "../../../utils/pages";
import PaginationButton from "../button/PaginationButton";
import { useRefCreate } from "../../../hook/useRefCreate";

const Pagination = ({ setPage, count, limit }) => {
  const countBtnNext = getPagesArray(count, limit);

  const [stepPage, setStepPage] = useState(null);
  const [item, setItem] = useState(1);

  const { start, end, disStatus } = useRefCreate(4);
  const btnAll = document.querySelectorAll(`.btn`);
  const activeButton = document.querySelector(`.active-button`);

  const activeBtn = (item) => {
    btnAll.forEach((el) => {
      el.classList.remove(`active-button`);
    });
    btnAll[item - 1].classList.add(`active-button`);

    setItem(item);
    setPage(item);
  };

  useEffect(() => {
    setStepPage(activeButton);
    disStatus(start, item === countBtnNext.length ? true : false);
    disStatus(end, item === 1 ? true : false);
  }, [countBtnNext]);

  const step = (step) => {
    let indexActive = +stepPage.innerText;
    btnAll[indexActive - step].click();
  };

  return (
    <div className="mainSlot" id="pagination">
      <PaginationButton
        func={activeBtn}
        item={1}
        classname={"btnEdge _0"}
        refEl={end[0]}
        text={"<<"}
      />

      <PaginationButton
        func={() => step(2)}
        text={"<"}
        classname={"btnEdge _2"}
        refEl={end[1]}
      />

      <div className="btnContainer">
        {countBtnNext.map((item) => (
          <PaginationButton
            func={activeBtn}
            item={item}
            text={item}
            classname={item === 1 ? "btn active-button" : "btn"}
            key={item}
          />
        ))}
      </div>

      <PaginationButton
        func={() => step(0)}
        text={">"}
        classname={"btnEdge _1"}
        refEl={start[0]}
      />

      <PaginationButton
        func={activeBtn}
        item={countBtnNext.length}
        text={">>"}
        classname={"btnEdge _3"}
        refEl={start[1]}
      />
    </div>
  );
};

export default Pagination;
