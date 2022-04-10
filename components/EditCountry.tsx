import React from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Form, Formik } from "formik";
import Box from "@mui/material/Box";
import { InputField } from "./form/InputField";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Country } from "../util/type";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface EditCountryProps {
    country?: Country | null;
    handleClose: (...any: any) => void;
};

export const EditCountry: React.FC<EditCountryProps> = ({ country, handleClose }) => {
    const queryClient = useQueryClient()


    const creation = useMutation(
        (newCountry: any) => axios.post(`/api/country?name=${newCountry.name}&color=${newCountry.color.replace("#", "%23")}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("countryData", data.data)
                handleClose();
            }
        }
    )

    const mutation = useMutation(
        (newCountry: any) => axios.put(`/api/country?id=${newCountry.id}&name=${newCountry.name}&color=${newCountry.color.replace("#", "%23")}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("countryData", data.data)
                handleClose();
            }
        }
    )

    const deletion = useMutation(
        (id: string) => axios.delete(`/api/country?id=${id}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("countryData", data.data)
                handleClose();
            }
        }
    )

    return (
        <Modal
            open={country !== undefined}
            onClose={handleClose}
        >{/* Form with Formik */}
            <Formik

                // Fields
                initialValues={{
                    name: country?.name || "",
                    color: country?.color || "orange"
                }}

                // Submit function
                onSubmit={async (values) => {
                    if (country == null) {
                        creation.mutate({
                            name: values.name,
                            color: values.color,
                        })
                    }
                    else {
                        mutation.mutate({
                            id: country?.id,
                            name: values.name,
                            color: values.color,
                        })
                    }
                }}
            >

                {({ values }) => (<>
                    {/* Box for header and menu options */}
                    <Box justifyContent="space-between" alignItems="center" bgcolor="white" borderRadius={2} p={4} mt={8} mx={8}>

                        <Box display="flex">
                            <h3>{country ? "Edit" : "Add"} Country</h3>

                            <IconButton sx={{ marginLeft: "auto" }} onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* Form with Formik controls */}
                        <Form style={{
                            flexGrow: 1,
                            flexShrink: 1,
                            flexBasis: 300,
                            display: "flex",
                            flexDirection: "column"
                        }}>

                            <Box display="flex">
                                <InputField
                                    label="Name"
                                    name="name"
                                    autoComplete="off"
                                    placeholder="Untitled"
                                    variant="filled"
                                    required
                                    containerStyle={{ marginRight: 4, width: 300 }}
                                />

                                <InputField
                                    label="Color"
                                    name="color"
                                    autoComplete="off"
                                    variant="filled"
                                    placeholder="orange"
                                    required
                                    containerStyle={{ marginRight: 4, width: 300 }}
                                />
                            </Box>

                            {/* Submit Button */}
                            <Box marginTop={4} display="flex">
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Save Country
                                </Button>

                                {!!country &&
                                    <IconButton sx={{ marginLeft: "auto" }} onClick={() => { deletion.mutate(country!.id) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            </Box>
                        </Form>
                    </Box>
                </>)}
            </Formik>
        </Modal>
    );
};