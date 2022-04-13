import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Icon, IconButton } from "@chakra-ui/react";
import { DateTime } from "luxon";
import CreateForm from "./CreateForm";
import DataTable from "../../components/DataTable";
import { MdRemoveRedEye } from "react-icons/md";
import TableTitle from "../../components/TableTitle";
import API from "../../lib/api";

const Clients = () => {
  const navigate = useNavigate();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableList, setTableList] = useState([]);

  const goToFixes = useCallback(
    (id) => {
      navigate(`/client/${id}/cars`);
    },
    [navigate]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Fecha de creacion",
        accessor: "created_at",
        Cell: ({ value }) => DateTime.fromISO(value).toFormat("yyyy-MM-dd hh:mm"),
      },
      {
        id: "edit",
        accessor: "id",
        width: 100,
        Cell: ({ value }) => (
          <IconButton
            variant="ghost"
            colorScheme="white"
            fontSize="20px"
            mr={30}
            icon={<Icon as={MdRemoveRedEye} />}
            onClick={() => goToFixes(value)}
          />
        ),
      },
    ],
    [goToFixes]
  );
  const getClients = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get("/clients");
      // console.log("clients", data);
      setTableList(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getClients();
  }, [getClients]);

  const onCloseForm = (obj = false) => {
    if (obj) setTableList((s) => [...s, obj]);
    setIsOpenForm(false);
  };

  return (
    <Container maxW="container.xl" mt={10}>
      <TableTitle
        disabled={isLoading}
        title="Clientes"
        btnTitle="Agregar Cliente"
        onClickBtn={() => setIsOpenForm(true)}
      />
      <DataTable loading={isLoading} columns={columns} data={tableList} />
      <CreateForm isOpen={isOpenForm} onClose={onCloseForm} />
    </Container>
  );
};

export default Clients;
