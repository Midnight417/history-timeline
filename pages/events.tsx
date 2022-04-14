import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { EditEvent } from '../components/EditEvent';
import { EventItem } from '../components/EventItem';
import { Headbar } from '../components/Headbar'
import { Timeline } from '../components/Timeline'
import { HistoricalEvent } from '../util/types';

const Home: NextPage = () => {

  const { data } = useQuery<HistoricalEvent[]>('eventData', () =>
    fetch('/api/event').then(res =>
      res.json()
    )
  )

  const [index, setIndex] = useState(0);
  const scrollTo = (i: number) => () => setIndex(i);

  const [activeItem, setActiveItem] = useState<HistoricalEvent | undefined | null>(undefined);
  const handleOpen = (item: HistoricalEvent | null) => () => setActiveItem(item);
  const handleClose = () => setActiveItem(undefined);

  return (
    <>
      <Head>
        <title>IB HL History Timeline</title>
        <meta name="description" content="Historical Timeline for IB's HL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box display="flex" flexDirection="column" height="100vh" pb={4}>
        <Headbar />

        <Timeline data={data || []} index={index} setIndex={setIndex} />

        <Button onClick={handleOpen(null)} sx={{ margin: 5, marginBottom: 2, marginTop: 1 }} variant="contained">+ Add Event</Button>

        <Box px={5} pr={1} mr={5} flex="1 1 300px" sx={{ overflowY: "scroll" }}>
          {(data || []).map((item, i) => <EventItem key={item.id} event={item} scrollTo={scrollTo(i)} handleOpen={handleOpen(item)} />)}
        </Box>

        <EditEvent event={activeItem} handleClose={handleClose} />

      </Box>

    </>
  )
} 

export default Home
