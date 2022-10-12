import axios from "axios";
import { token, URL_BASE } from "../constants/URL_BASE";
import { useEffect, useContext } from "react";
import { GlobalStateContext } from "../../src/global/GlobalStateContext";
import Swal from "sweetalert2";

export const addCart = (id) => {
  const body = {
    productId: id,
  };
  axios
    .post(`${URL_BASE}/list/create`, body, token)
    .then(() => {
      Getcart();
    })
    .catch((error) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1900,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: error.response.data,
      });
    });
};

export const removeCart = (id) => {
  axios
    .delete(`${URL_BASE}/list/delete/${id}`, token)
    .then((res) => {})
    .catch((error) => alert(error.response.data));
};

export const removeAll = (id) => {
  axios
    .delete(`${URL_BASE}/list/deleteall/${id}`, token)
    .then((res) => {
      Swal.fire({
        title: "Deseja realmente remover esse item ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#319518",
        cancelButtonColor: "#d33",
        confirmButtonText: "Remover!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deletado!");
        }
      });
    })
    .catch((error) => alert(error.response));
};

export const Getcart = () => {
  const { cart, setCart } = useContext(GlobalStateContext);
  useEffect(() => {
    axios
      .get(`${URL_BASE}/list`, token)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => alert(err.reponse.data.message));
  }, [cart]);
};
