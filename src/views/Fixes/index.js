import React, { useCallback, useEffect, useState } from "react";
import { Container, Text } from "@chakra-ui/react";
import CreateForm from "./CreateForm";
import DataTable from "../../components/DataTable";
import { useLocation } from "react-router-dom";
import TableTitle from "../../components/TableTitle";

const Fixes = () => {
  const { state } = useLocation();
  // console.log("loca", state);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableList, setTableList] = useState([
    { id: 1, name: "John", created_at: "2020-10-10" },
    { id: 2, name: "Doe", created_at: "2020-10-10" },
  ]);

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
            },
          ]
        : [
            {
              Header: "Nombre",
              accessor: "name",
            },
            {
              Header: "Auto",
              accessor: "id",
              Cell: ({ value }) => <Text>AutoName</Text>,
            },
            {
              Header: "Fecha de creacion",
              accessor: "created_at",
            },
          ],
    [state]
  );

  const onCloseForm = (obj = false) => {
    if (obj) setTableList((s) => [...s, { ...obj, created_at: "2022-10-10" }]);
    setIsOpenForm(false);
  };

  const getFixes = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await new Promise((res) => {
        setTimeout(() => {
          res({
            data: [
              { id: 1, name: "John", created_at: "2020-10-10" },
              { id: 2, name: "Doe", created_at: "2020-10-10" },
            ],
          });
        }, 1000);
      });
      setTableList(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getFixes();
  }, [getFixes]);

  return (
    <Container maxW="container.xl" mt={10}>
      <TableTitle
        disabled={isLoading}
        title="Reparaciones"
        btnTitle="Agregar Reparacion"
        onClickBtn={() => setIsOpenForm(true)}
      />
      <DataTable loading={isLoading} columns={columns} data={tableList} />
      <CreateForm isOpen={isOpenForm} carSelected={state} onClose={onCloseForm} />
    </Container>
  );
};

export default Fixes;
