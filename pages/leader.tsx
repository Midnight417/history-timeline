import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ListItem } from '../components/ListItem';
import { Headbar } from '../components/Headbar'
import { Leader } from '../util/type';
import { EditLeader } from '../components/EditLeader';

const Home: NextPage = () => {

  const { isLoading, data } = useQuery('leaderData', () =>
    fetch('/api/leader').then(res =>
      res.json()
    )
  ) as { isLoading: boolean, data: Leader[] }

  const [activeItem, setActiveItem] = useState<Leader | undefined | null>(undefined);
  const handleOpen = (item: Leader | null) => () => setActiveItem(item);
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

        <Button onClick={handleOpen(null)} sx={{ margin: 5, marginBottom: 2, marginTop: 1 }} variant="contained">+ Add Leader</Button>

        <Box px={5} pr={1} mr={5} flex="1 1 400px" sx={{ overflowY: "scroll" }}>
          {(data || []).map((item, i) => <ListItem key={item.id} handleOpen={handleOpen(item)}>{item.name}</ListItem>)}
        </Box>

        <EditLeader leader={activeItem} handleClose={handleClose} />

      </Box>

    </>
  )
}

export default Home
