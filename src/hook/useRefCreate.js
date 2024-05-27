import { useRef } from "react";

export const useRefCreate = (count) => {
     const refs = Array.from({ length: count }, () => useRef(null));

     const splitArray = (array) => {
          const withRemainder = [];
          const noRemainder = [];

          array.map((el, index) => {
               index % 2 === 0 ? noRemainder.push(el) : withRemainder.push(el);
          });

          return [withRemainder, noRemainder];
     };

     const disStatus = (arr, status) => {
          arr.map((item) => (item.current.disabled = status));
     };

     const [start, end] = splitArray(refs);

     return { start, end, disStatus }
}