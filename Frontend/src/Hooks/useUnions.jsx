import { useEffect, useState } from "react";

const useUnions = () => {
  const [unions, setUnions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Data/unions.json")
      .then((res) => res.json())
      .then((data) => {
        setUnions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load unions:", error);
        setLoading(false);
      });
  }, []);

  return { unions, loading };
};

export default useUnions;
