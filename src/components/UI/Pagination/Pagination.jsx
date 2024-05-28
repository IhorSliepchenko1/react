import "./Pagination.scss";
import { useEffect, useRef, useState } from "react";
import { getPagesArray } from "../../../utils/pages";
import PaginationButton from "../button/PaginationButton";
import { useRefCreate } from "../../../hook/useRefCreate";
import { useActiveButton } from "../../../hook/useActiveButton";

const Pagination = ({ setPage, count, limit }) => {
  const countBtnNext = getPagesArray(count, limit);
  const [stepPage, setStepPage] = useState(null);
  const [item, setItem] = useState(1);

  const { start, end, disStatus } = useRefCreate(4);
  const btnAll = document.querySelectorAll(`.btn`);
  const activeButton = document.querySelector(`.active-button`);

  const { activeBtn } = useActiveButton({ setItem, setPage, btnAll });

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
        onClick={() => activeBtn(1)}
        classname={"btnEdge _0"}
        refEl={end[0]}
        text={"<<"}
      />

      <PaginationButton
        onClick={() => step(2)}
        text={"<"}
        classname={"btnEdge _2"}
        refEl={end[1]}
      />

      <div className="btnContainer">
        {countBtnNext.map((item, index) => (
          <PaginationButton
            onClick={(e) => activeBtn(+e.target.innerText)}
            text={item}
            classname={index === 0 ? "btn active-button" : "btn"}
            key={item}
          />
        ))}
      </div>

      <PaginationButton
        onClick={() => step(0)}
        text={">"}
        classname={"btnEdge _1"}
        refEl={start[0]}
      />

      <PaginationButton
        onClick={() => activeBtn(countBtnNext.length)}
        text={">>"}
        classname={"btnEdge _3"}
        refEl={start[1]}
      />
    </div>
  );
};

export default Pagination;
