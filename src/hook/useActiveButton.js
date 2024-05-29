export const useActiveButton = ({ setItem, setPage, btnAll, stepPage }) => {

     const activeBtn = (num) => {
          btnAll.forEach((el) => {
               el.classList.remove(`active-button`);
          });

          btnAll[num - 1].classList.add(`active-button`);

          setItem(num);
          setPage(num);

     }

     const step = (step) => {
          let indexActive = +stepPage.innerText;
          btnAll[indexActive - step].click();
     };

     const mainStep = (symbol, item) => {
          switch (symbol) {
               case `+`:
                    setItem((prev) => prev + 1);
                    setPage((prev) => prev + 1);
                    break;

               case `-`:
                    setItem((prev) => prev - 1);
                    setPage((prev) => prev - 1);
                    break;

               case `start`:
                    setItem(1);
                    setPage(1);
                    break;

               case `end`:
                    setItem(item);
                    setPage(item);
                    break;

               case `default`:
                    activeBtn(item)
                    break;

               case `step`:
                    step(item)
                    break;
          }
     };

     return { mainStep }
}