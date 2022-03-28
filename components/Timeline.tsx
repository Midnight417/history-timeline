import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from "@mui/material/Typography";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { HistoricalEvent } from '../util/type';
import { toHumanDate } from "../util/const";

interface TimelineProps {
    data: HistoricalEvent[];
    index: number;
    setIndex: Dispatch<SetStateAction<number>>;
};

const IconWrapper = styled('div')(() => ({
    width: 128,
    height: "100%",
    paddingTop: 72,
    display: "flex",
    alignItem: "center",
    justifyContent: "center"
}));

export const Timeline: React.FC<TimelineProps> = ({ data, index, setIndex }) => {

    data.sort((a, b) => {
        if (a.date[0] - b.date[0]) return a.date[0] - b.date[0];
        if (a.date[1] - b.date[1]) return a.date[2] - b.date[2];
        if (a.date[2] - b.date[2]) return a.date[2] - b.date[2];
        return 0;
    });

    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const distance = data.reduce<number>((prev, curr, i) => {
            if (i <= index) {
                const dist = i ? 100 + ((curr.date[0] - data[i - 1].date[0]) * 365 + (curr.date[1] - data[i - 1].date[1]) * 30 + (curr.date[2] - data[i - 1].date[2])) + 22  : 0;
                return prev + dist;
            }
            else {
                return prev;
            }
        }, 11);
        setScroll(distance);
    }, [index, data]);

    return (
        <Box display="flex" alignItems="center">
            <IconWrapper>
                <IconButton onClick={() => { setIndex(index - 1) }} disabled={!index}>
                    <ChevronLeftIcon />
                </IconButton>
            </IconWrapper>
            <Box mt={4} overflow="hidden" px={"calc(50vw - 128px)"} width="calc(100vw - 256px)">
                <Box ml={`-${scroll}px`} display="flex" alignItems="center" sx={{ transition: "margin 0.5s" }}>
                    {data.map((item, i) => (<>
                        {!!i &&
                            <Box
                                key={`line-${item.id}`}
                                flexShrink={0}
                                mt={5.5}
                                borderTop="2px solid #d8d8da"
                                width={100 + ((item.date[0] - data[i - 1].date[0]) * 365 + (item.date[1] - data[i - 1].date[1]) * 30 + (item.date[2] - data[i - 1].date[2]))}
                            />
                        }

                        <Box key={`node-${item.id}`} sx={{ cursor: "pointer" }} flexShrink={0} display="flex" flexDirection="column" alignItems="center" width={22} onClick={() => {
                            setIndex(i);
                        }}>

                            <Typography width={100} textAlign="center" fontSize="small">
                                {
                                    item.monthPresent && item.datePresent
                                        ? toHumanDate(item.date, { month: true, date: true })
                                        : item.monthPresent
                                            ? toHumanDate(item.date, { month: true })
                                            : toHumanDate(item.date)
                                }
                            </Typography>

                            <Typography width={100} textAlign="center" fontWeight="bold">
                                {item.name}
                            </Typography>

                            <svg viewBox="0 0 50 100" width="15px">
                                <polygon points="2 25, 2 75, 25 100, 48 75, 48 25" fill={i == index ? "#1976d3" : "orange"} />
                            </svg>
                        </Box>
                    </>))}
                </Box>
            </Box>
            <IconWrapper>
                <IconButton onClick={() => { setIndex(index + 1) }} disabled={index == data.length - 1 || data.length == 0}>
                    <ChevronRightIcon />
                </IconButton>
            </IconWrapper>
        </Box>
    );
};