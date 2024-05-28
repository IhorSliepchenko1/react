export const useActiveButton = ({ setItem, setPage, btnAll }) => {
     const activeBtn = (num) => {

          btnAll.forEach((el) => {
               el.classList.remove(`active-button`);
          });

          btnAll[num - 1].classList.add(`active-button`);

          setItem(num);
          setPage(num);

     }

     return { activeBtn }
}