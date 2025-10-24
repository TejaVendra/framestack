import { useState, useEffect } from "react";

function Loader() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-center py-50 text-xl font-semibold animate-pulse">
      Loading{dots}
    </p>
  );
}

export default Loader;
