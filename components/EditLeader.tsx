import React from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Form, Formik } from "formik";
import Box from "@mui/material/Box";
import { InputField } from "./form/InputField";
import { InputSelect } from "./form/InputSelect";
import { InputColor } from "./form/InputColor";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Country, Leader } from "../util/type";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface EditLeaderProps {
    leader?: Leader | null;
    handleClose: (...any: any) => void;
};

export const EditLeader: React.FC<EditLeaderProps> = ({ leader, handleClose }) => {
    const queryClient = useQueryClient()

    const creation = useMutation(
        (newLeader: any) => axios.post(`/api/leader?name=${newLeader.name}&color=${newLeader.color.replace("#", "%23")}&country=${newLeader.country}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("leaderData", data.data)
                handleClose();
            }
        }
    )

    const mutation = useMutation(
        (newLeader: any) => axios.put(`/api/leader?id=${newLeader.id}&name=${newLeader.name}&color=${newLeader.color.replace("#", "%23")}&country=${newLeader.country}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("leaderData", data.data)
                handleClose();
            }
        }
    )

    const deletion = useMutation(
        (id: string) => axios.delete(`/api/leader?id=${id}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("leaderData", data.data)
                handleClose();
            }
        }
    )

    const { isLoading: countryLoading, data: countryData } = useQuery('countryData', () =>
        fetch('/api/country').then(res =>
            res.json()
        )
    ) as unknown as { isLoading: boolean, data: Country[] };

    return (
        <Modal
            open={leader !== undefined}
            onClose={handleClose}
        >{/* Form with Formik */}
            <Formik

                // Fields
                initialValues={{
                    name: leader?.name || "",
                    color: leader?.color || "orange",
                    country: leader?.countryId
                }}

                // Submit function
                onSubmit={async (values) => {
                    if (leader == null) {
                        creation.mutate({
                            name: values.name,
                            color: values.color,
                            country: values.country,
                        })
                    }
                    else {
                        mutation.mutate({
                            id: leader?.id,
                            name: values.name,
                            color: values.color,
                            country: values.country,
                        })
                    }
                }}
            >

                {({ values }) => (<>
                    {/* Box for header and menu options */}
                    <Box justifyContent="space-between" alignItems="center" bgcolor="white" borderRadius={2} p={4} mt={8} mx={8}>

                        <Box display="flex">
                            <h3>{leader ? "Edit" : "Add"} Leader</h3>

                            <IconButton sx={{ marginLeft: "auto", width: 36, height: 36 }} onClick={handleClose}>
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

                                <InputSelect
                                    label="Country"
                                    name="country"
                                    variant="filled"
                                    options={[{ name: <Box height={24} display="inline" />, id: "undefined" }, ...(countryData || [])].map(country => (
                                        {
                                            name: country.name,
                                            value: country.id
                                        }
                                    ))}
                                    containerStyle={{ marginRight: 4, width: 200 }}
                                />

                                <InputColor
                                    label="Color"
                                    name="color"
                                    autoComplete="off"
                                    placeholder="orange"
                                    required
                                    containerStyle={{ width: 300 }}
                                />
                            </Box>

                            {/* Submit Button */}
                            <Box marginTop={4} display="flex">
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Save Leader
                                </Button>

                                {!!leader &&
                                    <IconButton sx={{ marginLeft: "auto" }} onClick={() => { deletion.mutate(leader!.id) }}>
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