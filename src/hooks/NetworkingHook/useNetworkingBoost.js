import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";

export default () => {
  const [boostLoading, setBoostLoading] = useState(false);
  const [boostData, setBoostData] = useState([]);
  const [boostPage, setBoostPage] = useState(1);
  const [boostMaxPage, setBoostMaxPage] = useState();
  let isMounted = true;
  const getBoostData = () => {
    setBoostLoading(true);
    axios
      .get(
        `${api}/api/v1/posts/boosts?page=${boostPage}&sort=-createdAt&limit=1`
      )
      .then((res) => {
        if (isMounted) {
          setBoostData([...boostData, ...res.data.data]);
          setBoostMaxPage(res.data.pagination.pageCount);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setBoostLoading(false);
      });
  };

  useEffect(() => {
    getBoostData();
    return () => {
      isMounted = false;
    };
  }, [boostPage]);

  return [boostLoading, boostData, boostMaxPage, boostPage, setBoostPage];
};
