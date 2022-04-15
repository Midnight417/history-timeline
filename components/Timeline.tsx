import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from "@mui/material/Typography";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { HistoricalEvent } from '../util/types';
import { toHumanDate } from "../util/consts";

interface TimelineProps {
    data: HistoricalEvent[];
    index: number;
    setIndex: Dispatch<SetStateAction<number>>;
};

const IconWrapper = styled('div')(() => ({
    width: 128,
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center"
}));

export const Timeline: React.FC<TimelineProps> = ({ data, index, setIndex }) => {

    const [scroll, setScroll] = useState(0);

    const handleScroll = (event: any) => {
        const dir = event.wheelDelta ? event.wheelDelta > 0 : event.deltaY < 0;
        if (dir && index != data.length - 1 && data.length != 0) {
            setIndex(index + 1);
        }
        else if (!dir && index != 0) {
            setIndex(index - 1);
        }
    }

    useEffect(() => {
        const distance = data.reduce<number>((prev, curr, i) => {
            if (i <= index) {
                const dist = i ? 75 + ((curr.date[0] - data[i - 1].date[0]) * 365 + (curr.date[1] - data[i - 1].date[1]) * 30 + (curr.date[2] - data[i - 1].date[2])) / 5 + 22 : 0;
                return prev + dist;
            }
            else {
                return prev;
            }
        }, 11);
        setScroll(distance);
    }, [index, data]);

    return (
        <Box display="flex" alignItems="center" mt={2} height={150}>
            <IconWrapper>
                <IconButton onClick={() => { setIndex(index - 1) }} disabled={!index}>
                    <ChevronLeftIcon />
                </IconButton>
            </IconWrapper>
            <Box mt={2} overflow="hidden" px="calc(50vw - 128px)" width="calc(100vw - 256px)" onWheel={handleScroll}>
                <Box ml={`-${scroll}px`} display="flex" alignItems="flex-end" sx={{ transition: "margin 0.5s" }}>
                    {data.map((item, i) => (<>
                        {!!i &&
                            <Box
                                key={`line-${item.id}`}
                                flexShrink={0}
                                mb={1.5}
                                borderTop="2px solid #d8d8da"
                                width={75 + ((item.date[0] - data[i - 1].date[0]) * 365 + (item.date[1] - data[i - 1].date[1]) * 30 + (item.date[2] - data[i - 1].date[2])) / 5}
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

                            <Typography width={100} maxHeight={60} color={index == i ? item.leader?.color || item.country?.color || "orange" : "black"} overflow="hidden" display="-webkit-box" sx={{ "-webkit-line-clamp": "3", "-webkit-box-orient": "vertical" }} textAlign="center" fontSize="small" fontWeight="bold">
                                {item.name}
                            </Typography>

                            <svg viewBox="0 0 50 100" width="15px">
                                <polygon points="2 25, 2 75, 25 100, 48 75, 48 25" fill={item.leader?.color || item.country?.color || "orange"} />
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