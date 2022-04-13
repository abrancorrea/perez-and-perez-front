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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const initialState = { name: "" };

const CreateForm = ({ isOpen, onClose }) => {
  const cancelRef = React.useRef();
  const [formData, setFormData] = useState(initialState);

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
              Agregar nuevo auto
            </AlertDialogHeader>

            <AlertDialogBody>
              <Flex>
                <Input
                  value={formData.name}
                  name="name"
                  onChange={handleChangeInput}
                  placeholder="Nombre/Modelo del auto"
                />
              </Flex>
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
