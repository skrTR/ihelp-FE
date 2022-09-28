import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";

export default (id) => {
  const [loading, setLoading] = useState(false);
  const [followData, setFollowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [refreshing, setRefreshing] = useState(false);
  let isMounted = true;
  const getFollowData = () => {
    setLoading(true);
    setRefreshing(true);
    axios
      .get(
        `${api}/api/v1/posts/${id}/following?page=${currentPage}&sort=-createdAt&limit=5`
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
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getFollowData();
    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  return [
    loading,
    followData,
    maxPage,
    currentPage,
    setCurrentPage,
    refreshing,
    getFollowData,
    setRefreshing,
  ];
};
