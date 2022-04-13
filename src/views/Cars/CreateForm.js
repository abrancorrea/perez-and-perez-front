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
import API from "../../lib/api";

const initialState = { name: "", client_id: null };

const CreateForm = ({ isOpen, onClose, clientId }) => {
  const cancelRef = React.useRef();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = ({ target }) => {
    setFormData((s) => ({ ...s, [target.name]: target.value }));
  };

  const isDisabledBtn = () => Object.values(formData).some((data) => !Boolean(data));

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.post("/cars", formData);
      onClose(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) setFormData({ ...initialState, client_id: clientId });
    else setFormData(initialState);
  }, [isOpen, clientId]);

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
