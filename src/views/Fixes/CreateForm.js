import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import API from "../../lib/api";

const initialState = { name: "", car_id: null };

const CreateForm = ({ isOpen, onClose, carSelected, carList }) => {
  const cancelRef = React.useRef();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSelected, setClientSelected] = useState(null);
  const [clientList, setClientList] = useState([]);

  const handleChangeInput = ({ target }) => {
    setFormData((s) => ({ ...s, [target.name]: target.value }));
  };

  const isDisabledBtn = () => Object.values(formData).some((data) => !Boolean(data));

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.post("/fixes", formData);
      onClose(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const getClients = useCallback(async () => {
    try {
      const { data } = await API.get("/clients");
      // console.log("clients", data);
      setClientList(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (carSelected) setFormData({ ...initialState, car_id: carSelected });
      else getClients();
    } else {
      setFormData(initialState);
      setClientSelected(null);
    }
  }, [isOpen, getClients, carSelected]);

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Agregar nueva reparacion
            </AlertDialogHeader>

            <AlertDialogBody>
              <Flex my={5}>
                <Input
                  value={formData.name}
                  name="name"
                  onChange={handleChangeInput}
                  placeholder="Nombre de la reparacion"
                />
              </Flex>
              {!carSelected && (
                <>
                  <Flex my={5}>
                    <Select
                      value={clientSelected}
                      onChange={(e) => setClientSelected(e.target.value)}
                      placeholder="Seleccionar cliente"
                    >
                      {clientList.length > 0 &&
                        clientList.map(({ id, name }) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                    </Select>
                  </Flex>
                  <Flex my={5}>
                    <Select
                      value={formData.car_id}
                      name="car_id"
                      onChange={handleChangeInput}
                      placeholder="Seleccionar auto"
                    >
                      {carList.length > 0 &&
                        carList
                          .filter((el) => el.client_id === clientSelected)
                          .map(({ id, name }) => (
                            <option key={id} value={id}>
                              {name}
                            </option>
                          ))}
                    </Select>
                  </Flex>
                </>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => onClose()}>
                Cancelar
              </Button>
              <Button
                disabled={isDisabledBtn()}
                colorScheme="red"
                onClick={onSubmit}
                isLoading={isLoading}
                ml={3}
              >
                Añadir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CreateForm;
