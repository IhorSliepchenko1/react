import { useEffect } from "react";

export const useFocus = (clickRef) => {

     const handleClicFocus = (event) => {
          clickRef.current.style =
               clickRef.current.contains(event.target)
                    ? `box-shadow: 2px 2px 15px 3px rgba(21, 66, 31, 1)`
                    : clickRef.current.style = `box-shadow: 0`;
     };

     useEffect(() => {
          document.addEventListener("click", handleClicFocus, true);
          return () => {
               document.removeEventListener("click", handleClicFocus, true);
          };
     }, []);

}