import { useEffect, useState } from "react";

const useBloodGroups = () => {
  const [bloodGroups, setBloodGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Data/bloodGroups.json")
      .then((res) => res.json())
      .then((data) => {
        setBloodGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blood groups", err);
        setLoading(false);
      });
  }, []);

  return { bloodGroups, loading };
};

export default useBloodGroups;
