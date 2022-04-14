import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from "@mui/material/TextField";
import React, { Dispatch, SetStateAction } from "react";
import { Filter, Leader, Country } from "../util/types";
import { useQuery } from "react-query";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface EventFilterProps {
    useParams: [Filter, Dispatch<SetStateAction<Filter>>];
};

export const EventFilter: React.FC<EventFilterProps> = ({ useParams }) => {

    const [params, setParams] = useParams;

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
        <Box display="flex" height={75} mx={5} mt={2} alignItems="flex-end">
            <Box mb={1} sx={{opacity: 0.8}}>
                Filter By:
            </Box>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    minDate={new Date("1800-1-1")}
                    maxDate={new Date("2010-12-31")}
                    views={['year', 'month', 'day']}
                    label="Starting Date"
                    value={params.startDate}
                    onChange={(newValue) => {
                        if (newValue && isNaN(newValue.valueOf())) return;
                        if (!newValue) {
                            setParams({ ...params, startDate: null })
                        }
                        else if (!params.endDate || (params.endDate && newValue.getTime() < params.endDate?.getTime())) {
                            setParams({ ...params, startDate: newValue })
                        }
                        else {
                            setParams({ ...params, startDate: params.endDate })
                        }
                    }}
                    renderInput={(params) => <TextField variant="standard" sx={{ width: 150, mr: 2, ml: 3 }} {...params} />}
                />
                <DatePicker
                    minDate={new Date("1800-1-1")}
                    maxDate={new Date("2010-12-31")}
                    views={['year', 'month', 'day']}
                    label="Ending Date"
                    value={params.endDate}
                    onChange={(newValue) => {
                        if (newValue && isNaN(newValue.valueOf())) return;
                        if (!newValue) {
                            setParams({ ...params, endDate: null })
                        }
                        else if (!params.startDate || (params.startDate && newValue.getTime() > params.startDate?.getTime())) {
                            if (newValue.getTime() > (new Date("2010-12-31")).getTime()) {
                                setParams({ ...params, endDate: new Date("2010-12-31") })
                            }
                            else if (newValue.getTime() < (new Date("1800-1-1")).getTime()) {
                                setParams({ ...params, endDate: new Date("1800-1-1") })
                            }
                            else {
                                setParams({ ...params, endDate: newValue })
                            }
                        }
                        else {
                            setParams({ ...params, endDate: params.startDate })
                        }
                    }}
                    renderInput={(params) => <TextField variant="standard" sx={{ width: 150, mr: 2 }} {...params} />}
                />
            </LocalizationProvider>

            <FormControl sx={{ width: 300, mr: 2 }}>
                <InputLabel id="label-leader">Leaders</InputLabel>
                <Select
                    variant="standard"
                    labelId="label-leader"
                    multiple
                    value={params.leader}
                    onChange={(event) => {
                        const { target: { value }, } = event;
                        setParams({
                            ...params,
                            leader: typeof value === 'string' ? value.split(',') : value,
                        });
                    }}
                    renderValue={(selected: string[]) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={(leaderData || []).find(item => item.id == value)?.name} />
                            ))}
                        </Box>
                    )}
                    placeholder="Countries"
                >
                    {(leaderData || []).map((item) => (
                        <MenuItem
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ width: 300, mr: 2 }}>
                <InputLabel id="label-country">Countries</InputLabel>
                <Select
                    variant="standard"
                    labelId="label-country"
                    multiple
                    value={params.country}
                    onChange={(event) => {
                        const { target: { value }, } = event;
                        setParams({
                            ...params,
                            country: typeof value === 'string' ? value.split(',') : value,
                        });
                    }}
                    renderValue={(selected: string[]) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={(countryData || []).find(item => item.id == value)?.name} />
                            ))}
                        </Box>
                    )}
                    placeholder="Countries"
                >
                    {(countryData || []).map((item) => (
                        <MenuItem
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </Box >
    );
};