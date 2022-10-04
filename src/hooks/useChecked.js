import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { api } from "../../Constants";
import UserContext from "../context/UserContext";
export default function useChecked() {
  const state = useContext(UserContext);
  const [error, setError] = useState("");
  useEffect(() => {
    if (state.isCompany) {
      axios.get(`${api}/api/v1/profiles/${state.companyId}`).catch((err) => {
        const message = err.response.data.error.message;
        setError(err.response.data.error.message);
        if (message === `${state.companyId} ID-тэй компани байхгүй!`) {
          state.logout();
        } else if (
          message ===
          "Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Та эхлээд логин хийнэ үү. Authorization header-ээр эсвэ Cookie ашиглан токеноо дамжуулна уу."
        ) {
          state.logout();
        }
      });
    } else if (!state.isCompany) {
      axios.get(`${api}/api/v1/cvs/${state.userId}`).catch((err) => {
        const message = err.response.data.error.message;
        setError(err.response.data.error.message);
        if (message === `${state.userId} ID-тэй хэрэглэгч байхгүй!`) {
          state.logout();
        } else if (
         1
        ) {
          state.logout();
        }
      });
    }
  }, []);
  return [error];
}
