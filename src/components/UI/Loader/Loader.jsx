import lottie from "lottie-web";

import { useEffect, useRef } from "react";

const Loader = ({ name }) => {
  const loaderRef = useRef();

  useEffect(() => {
    lottie.loadAnimation({
      container: loaderRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/loader.json",
    });
    return () => lottie.destroy(name);
  }, []);

  return <div ref={loaderRef} className="loader"></div>;
};

export default Loader;
