import React, { useCallback, useEffect, useState } from "react";
import { Container, Icon, IconButton } from "@chakra-ui/react";
import CreateForm from "./CreateForm";
import DataTable from "../../components/DataTable";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import TableTitle from "../../components/TableTitle";

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
    if (obj) setTableList((s) => [...s, { ...obj, created_at: "2022-10-10" }]);
    setIsOpenForm(false);
  };

  const getCars = useCallback(async () => {
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
    getCars();
  }, [getCars]);

  return (
    <Container maxW="container.xl" mt={10}>
      <TableTitle
        disabled={isLoading}
        title="Autos"
        btnTitle="Agregar Auto"
        onClickBtn={() => setIsOpenForm(true)}
      />
      <DataTable loading={isLoading} columns={columns} data={tableList} />
      <CreateForm isOpen={isOpenForm} onClose={onCloseForm} />
    </Container>
  );
};

export default Cars;
