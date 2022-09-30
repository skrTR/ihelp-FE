import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";

export default (id) => {
  const [loading, setLoading] = useState(false);
  const [followData, setFollowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  let isMounted = true;
  const getFollowData = () => {
    setLoading(true);
    axios
      .get(
        `${api}/api/v1/posts/${id}/following?page=${currentPage}&sort=-createdAt&limit=4`
      )
      .then((res) => {
        if (isMounted) {
          setFollowData([...followData, ...res.data.data]);
          setMaxPage(res.data.pagination.pageCount);
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getFollowData();
    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  return [loading, followData, maxPage, currentPage, setCurrentPage];
};
