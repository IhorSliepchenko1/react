import "./Pagination.scss";
import { useEffect, useState } from "react";
import { getPagesArray } from "../../../utils/pages";
import PaginationButton from "../button/PaginationButton";
import { useRefCreate } from "../../../hook/useRefCreate";
import { useActiveButton } from "../../../hook/useActiveButton";

const Pagination = ({ setPage, page, count, limit }) => {
  const countBtnNext = getPagesArray(count, limit);
  const [stepPage, setStepPage] = useState(null);
  const [item, setItem] = useState(1);

  const { start, end, disStatus } = useRefCreate(4);

  const btnAll = document.querySelectorAll(`.btn`);
  const activeButton = document.querySelector(`.active-button`);

  const { mainStep } = useActiveButton({ setItem, setPage, btnAll, stepPage });

  useEffect(() => {
    setStepPage(activeButton);
    disStatus(start, item === countBtnNext.length ? true : false);
    disStatus(end, item === 1 ? true : false);
  }, [countBtnNext]);

  return (
    <div className="mainSlot" id="pagination">
      <PaginationButton
        onClick={() =>
          countBtnNext.length < 15 ? mainStep(`default`, 1) : mainStep(`start`)
        }
        classname={"btnEdge _0"}
        refEl={end[0]}
        text={"<<"}
      />

      <PaginationButton
        onClick={() =>
          countBtnNext.length < 15 ? mainStep(`step`, 2) : mainStep(`-`)
        }
        text={"<"}
        classname={"btnEdge _2"}
        refEl={end[1]}
      />

      <div className="btnContainer">
        {countBtnNext.length < 15 ? (
          countBtnNext.map((item, index) => (
            <PaginationButton
              onClick={(e) => mainStep(`default`, +e.target.innerText)}
              text={item}
              classname={index === 0 ? "btn active-button" : "btn"}
              key={item}
            />
          ))
        ) : (
          <div className="alternativePagination">
            <span className="numb">{page}</span> /
            <span className="numb">{countBtnNext.length}</span>
          </div>
        )}
      </div>

      <PaginationButton
        onClick={() =>
          countBtnNext.length < 15 ? mainStep(`step`, 0) : mainStep(`+`)
        }
        text={">"}
        classname={"btnEdge _1"}
        refEl={start[0]}
      />

      <PaginationButton
        onClick={() =>
          countBtnNext.length < 15
            ? mainStep(`default`, countBtnNext.length)
            : mainStep(`end`, countBtnNext.length)
        }
        text={">>"}
        classname={"btnEdge _3"}
        refEl={start[1]}
      />
    </div>
  );
};

export default Pagination;
