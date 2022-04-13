import React, { useCallback, useEffect, useState } from "react";
import { Container, Icon, IconButton } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { ArrowBackIcon } from "@chakra-ui/icons";
import CreateForm from "./CreateForm";
import DataTable from "../../components/DataTable";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import TableTitle from "../../components/TableTitle";
import API from "../../lib/api";

const Cars = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  // console.log("id received", id);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableList, setTableList] = useState([
    { id: 1, name: "John", created_at: "2020-10-10" },
    { id: 2, name: "Doe", created_at: "2020-10-10" },
  ]);

  const goToFixes = useCallback(
    (id) => {
      // console.log(id);
      navigate("/fixes", { state: id });
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

  const onCloseForm = (obj = false) => {
    if (obj) setTableList((s) => [...s, obj]);
    setIsOpenForm(false);
  };

  const getCars = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get("/cars", { params: { clientId: id } });
      setTableList(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [id]);

  const backAction = () => navigate(-1);

  useEffect(() => {
    getCars();
  }, [getCars]);

  return (
    <Container maxW="container.xl" mt={10}>
      <TableTitle
        disabled={isLoading}
        title={
          <>
            <IconButton
              variant="link"
              colorScheme="white"
              fontSize="20px"
              onClick={backAction}
              mr={3}
              icon={<ArrowBackIcon />}
            />
            Autos
          </>
        }
        btnTitle="Agregar Auto"
        onClickBtn={() => setIsOpenForm(true)}
      />
      <DataTable loading={isLoading} columns={columns} data={tableList} />
      <CreateForm isOpen={isOpenForm} onClose={onCloseForm} clientId={id} />
    </Container>
  );
};

export default Cars;
