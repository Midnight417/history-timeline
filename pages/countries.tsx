import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ListItem } from '../components/ListItem';
import { Headbar } from '../components/Headbar'
import { Leader } from '../util/types';
import { EditCountry } from '../components/EditCountry';

const Home: NextPage = () => {

  const { isLoading, data } = useQuery<Leader[]>('countryData', () =>
    fetch('/api/country').then(res =>
      res.json()
    )
  )

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

        <Box px={5} pr={1} mr={5} mt={4} flex="1 1 400px" display="flex" flexWrap="wrap" alignItems="flex-start" justifyContent="flex-start">

          <Button
            onClick={handleOpen(null)}
            sx={{ mr: 2, width: 200, height: 175 }}
            variant="outlined"
          >
            + Add Country
          </Button>

          {(data || []).map((item, i) => (
            <ListItem
              key={item.id}
              handleOpen={handleOpen(item)}
              title={item.name}
              color={item.color}
            />
          ))}
        </Box>
        
        <EditCountry country={activeItem} handleClose={handleClose} />

      </Box>

    </>
  )
}

export default Home
