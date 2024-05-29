import { useRef, useEffect } from "react";

export const useFocus = () => {
     const clickRef = useRef(null)

     const handleClickOutside = (event) => {
          if (clickRef.current && !clickRef.current.contains(event.target)) {
               clickRef.current.style = `box-shadow: 0`;
          }
     };

     useEffect(() => {
          document.addEventListener("click", handleClickOutside, true);
          return () => {
               document.removeEventListener("click", handleClickOutside, true);
          };
     }, []);

     const handleClickInside = (shadow) => {
          if (clickRef.current) {
               clickRef.current.style = `box-shadow: ${shadow}`;
          }
     };

     return { handleClickInside, clickRef }
}