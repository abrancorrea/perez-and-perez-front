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
import React, { useEffect, useState } from "react";

const initialState = { name: "" };

const CreateForm = ({ isOpen, onClose, carSelected }) => {
  const cancelRef = React.useRef();
  const [formData, setFormData] = useState(initialState);
  const [selectList] = useState([
    { id: 1, name: "John", created_at: "2020-10-10" },
    { id: 2, name: "Doe", created_at: "2020-10-10" },
  ]);

  const handleChangeInput = ({ target }) => {
    setFormData((s) => ({ ...s, [target.name]: target.value }));
  };

  const isDisabledBtn = () => Object.values(formData).some((data) => !Boolean(data));

  const onSubmit = () => {
    console.log(formData);
    onClose(formData);
  };

  useEffect(() => {
    setFormData(initialState);
  }, [isOpen]);

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
                <Flex my={5}>
                  <Select placeholder="Seleccionar auto">
                    {selectList.length > 0 &&
                      selectList.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                  </Select>
                </Flex>
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
