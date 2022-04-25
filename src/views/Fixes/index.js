import React, { useCallback, useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import { DateTime } from "luxon";
import CreateForm from "./CreateForm";
import DataTable from "../../components/DataTable";
import { useLocation } from "react-router-dom";
import TableTitle from "../../components/TableTitle";
import API from "../../lib/api";

const Fixes = () => {
  const { state } = useLocation();
  debugger
  // console.log("loca", state);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableList, setTableList] = useState([]);
  const [carList, setCarList] = useState([]);

  const columns = React.useMemo(
    () =>
      state
        ? [
            {
              Header: "Nombre",
              accessor: "name",
            },
            {
              Header: "Fecha de creacion",
              accessor: "created_at",
              Cell: ({ value }) => DateTime.fromISO(value).toFormat("yyyy-MM-dd hh:mm"),
            },
          ]
        : [
            {
              Header: "Nombre",
              accessor: "name",
            },
            {
              Header: "Auto",
              accessor: "car_id",
              Cell: ({ value }) =>
                carList.find((el) => el.id === value)?.name || "No hay datos",
            },
            {
              Header: "Fecha de creacion",
              accessor: "created_at",
              Cell: ({ value }) => DateTime.fromISO(value).toFormat("yyyy-MM-dd hh:mm"),
            },
          ],
    [state, carList]
  );

  const onCloseForm = (obj = false) => {
    if (obj) setTableList((s) => [obj, ...s]);
    setIsOpenForm(false);
  };

  const getFixes = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get("/fixes", { params: { carId: state } });
      setTableList(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [state]);

  const getCars = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get("/cars");
      setCarList(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getFixes();
    if (!state) getCars();
  }, [getFixes, getCars, state]);

  return (
    <Container maxW="container.xl" mt={10}>
      <TableTitle
        disabled={isLoading}
        title="Reparaciones"
        btnTitle="Agregar Reparacion"
        onClickBtn={() => setIsOpenForm(true)}
      />
      <DataTable loading={isLoading} columns={columns} data={tableList} />
      <CreateForm
        carList={carList}
        isOpen={isOpenForm}
        carSelected={state}
        onClose={onCloseForm}
      />
    </Container>
  );
};

export default Fixes;
