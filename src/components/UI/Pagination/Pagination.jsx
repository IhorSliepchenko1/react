import { useEffect, useRef, useState } from "react";
import { getPagesArray } from "../../../utils/pages";
import PaginationButton from "../button/PaginationButton";
import "./Pagination.scss";

const Pagination = ({ setPage, count, limit }) => {
  const countBtnNext = getPagesArray(count, limit);

  const [stepPage, setStepPage] = useState(null);
  const [item, setItem] = useState(1);

  const nextRef = useRef(null);
  const finishRef = useRef(null);

  const prevRef = useRef(null);
  const startRef = useRef(null);

  const btnAll = document.querySelectorAll(`.btn`);

  const activeBtn = (item) => {
    btnAll.forEach((el) => {
      el.classList.remove(`active-button`);
    });
    btnAll[item - 1].classList.add(`active-button`);

    setItem(item);
    setPage(item);
  };

  useEffect(() => {
    const activeButton = document.querySelectorAll(`.active-button`);

    setStepPage(activeButton[0]);

    const arrRefEnd = [nextRef, finishRef];
    const arrRefStart = [prevRef, startRef];

    const disStatus = (arr, status) => {
      arr.map((item) => (item.current.disabled = status));
    };

    item === countBtnNext.length
      ? disStatus(arrRefEnd, true)
      : disStatus(arrRefEnd, false);

    item === 1 ? disStatus(arrRefStart, true) : disStatus(arrRefStart, false);
  }, [countBtnNext]);

  const step = () => {
    const stepObj = {
      next() {
        let indexActive = +stepPage.innerText;
        btnAll[indexActive].click();
      },

      prev() {
        let indexActive = +stepPage.innerText;
        btnAll[indexActive - 2].click();
      },
    };

    return stepObj;
  };

  const steps = step();

  return (
    <div className="mainSlot" id="pagination">
      <PaginationButton
        func={activeBtn}
        item={1}
        classname={"btnEdge"}
        refEl={startRef}
        text={"<<"}
      />

      <PaginationButton
        func={() => steps.prev()}
        text={"<"}
        classname={"btnEdge"}
        refEl={prevRef}
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
        func={() => steps.next()}
        text={">"}
        classname={"btnEdge"}
        refEl={nextRef}
      />

      <PaginationButton
        func={activeBtn}
        item={countBtnNext.length}
        text={">>"}
        classname={"btnEdge"}
        refEl={finishRef}
      />
    </div>
  );
};

export default Pagination;
