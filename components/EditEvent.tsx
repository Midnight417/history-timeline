import React from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Form, Formik } from "formik";
import Box from "@mui/material/Box";
import { InputField } from "./form/InputField";
import { InputSelect } from "./form/InputSelect";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { HistoricalEvent, Leader, Country } from "../util/types";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import dynamic from "next/dynamic";

const RichTextEditor = dynamic<{ text: string, setValue: (value: string) => any }>(() => import('./form/RichTextEditor').then(component => component.RichTextEditor), { ssr: false });

interface EditEventProps {
    event?: HistoricalEvent | null;
    handleClose: () => void;
};

export const EditEvent: React.FC<EditEventProps> = ({ event, handleClose }) => {
    const queryClient = useQueryClient()

    const creation = useMutation(
        (newEvent: any) => axios.post(`/api/event?name=${newEvent.name}&description=${newEvent.description}&date=${newEvent.date}&monthPresent=${newEvent.monthPresent}&datePresent=${newEvent.datePresent}&leader=${newEvent.leader}&country=${newEvent.country}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("eventData", data.data);
                handleClose();
            }
        }
    )

    const mutation = useMutation(
        (newEvent: any) => axios.put(`/api/event?id=${newEvent.id}&name=${newEvent.name}&description=${newEvent.description}&date=${newEvent.date}&monthPresent=${newEvent.monthPresent}&datePresent=${newEvent.datePresent}&leader=${newEvent.leader}&country=${newEvent.country}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("eventData", data.data)
                handleClose();
            }
        }
    )

    const deletion = useMutation(
        (id: string) => axios.delete(`/api/event?id=${id}`),
        {
            onSuccess: data => {
                queryClient.setQueryData("eventData", data.data)
                handleClose();
            }
        }
    )

    const { data: leaderData } = useQuery<Leader[]>('leaderData', () =>
        fetch('/api/leader').then(res =>
            res.json()
        )
    )

    const { data: countryData } = useQuery<Country[]>('countryData', () =>
        fetch('/api/country').then(res =>
            res.json()
        )
    )

    return (
        <Modal
            open={event !== undefined}
            onClose={handleClose}
        >{/* Form with Formik */}
            <Formik

                // Fields
                initialValues={{
                    name: event?.name || "",
                    description: event?.description || "",
                    year: event?.date[0] || 1990,
                    month: event?.monthPresent ? event.date[1] : undefined,
                    date: event?.datePresent ? event.date[2] : undefined,
                    leader: event?.leaderId || "undefined",
                    country: event?.countryId || "undefined"
                }}

                // Submit function
                onSubmit={async (values) => {
                    if (event == null) {
                        creation.mutate({
                            name: values.name,
                            description: values.description,
                            date: `${values.year}-${values.month ? values.month : 1}-${values.date ? values.date : 1}`,
                            monthPresent: !!values.month,
                            datePresent: !!values.date,
                            leader: values.leader,
                            country: values.country
                        })
                    }
                    else {
                        mutation.mutate({
                            id: event?.id,
                            name: values.name,
                            description: values.description,
                            date: `${values.year}-${values.month ? values.month : 1}-${values.date ? values.date : 1}`,
                            monthPresent: !!values.month,
                            datePresent: !!values.date,
                            leader: values.leader,
                            country: values.country
                        })
                    }
                }}
            >

                {({ values, setFieldValue }) => (<>
                    {/* Box for header and menu options */}
                    <Box justifyContent="space-between" alignItems="center" bgcolor="white" borderRadius={2} p={4} mt={8} mx={8}>

                        <Box display="flex">
                            <h3>{event ? "Edit" : "Add"} Event</h3>

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
                                    label="Leader"
                                    name="leader"
                                    variant="filled"
                                    options={[{ name: <Box height={24} display="inline" />, id: "undefined" }, ...(leaderData || [])].map(leader => (
                                        {
                                            name: leader.name,
                                            value: leader.id
                                        }
                                    ))}
                                    containerStyle={{ marginRight: 4, width: 200 }}
                                    onChange={(value) => {
                                        const newLeader = leaderData?.find(item => item.id == value);
                                        if (values.country === "undefined") setFieldValue("country", newLeader?.countryId || "undefined")
                                    }}
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
                                    containerStyle={{ width: 200 }}
                                />
                            </Box>

                            <RichTextEditor text={values.description} setValue={(value) => {setFieldValue("description", value)}} />

                            <Box display="flex">
                                <InputField
                                    label="Year"
                                    name="year"
                                    type="number"
                                    autoComplete="off"
                                    variant="filled"
                                    containerStyle={{ marginRight: 4 }}
                                    required
                                />

                                <InputField
                                    label="Month"
                                    name="month"
                                    type="number"
                                    autoComplete="off"
                                    variant="filled"
                                    containerStyle={{ marginRight: 4 }}
                                />

                                <InputField
                                    label="Date"
                                    name="date"
                                    type="number"
                                    autoComplete="off"
                                    variant="filled"
                                    containerStyle={{ marginRight: 4 }}
                                />
                            </Box>

                            {/* Submit Button */}
                            <Box marginTop={4} display="flex">
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Save Event
                                </Button>

                                {!!event &&
                                    <IconButton sx={{ marginLeft: "auto" }} onClick={() => { deletion.mutate(event!.id) }}>
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