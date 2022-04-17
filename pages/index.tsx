import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { EventFilter } from '../components/EventFilter';
import { Headbar } from '../components/Headbar'
import { Timeline } from '../components/Timeline'
import { HistoricalEvent, Filter } from '../util/types';
import { format } from 'date-fns'
import { useQueryClient } from "react-query";
import { server } from '../util/consts';

interface HomePageProps {
  events: HistoricalEvent[];
}

const Home: NextPage<HomePageProps> = ({ events }) => {
  const queryClient = useQueryClient()

  const [params, setParams] = useState<Filter>({
    startDate: null,
    endDate: null,
    leader: [],
    country: []
  })

  const { data } = useQuery<HistoricalEvent[]>('eventData', () => {
    let queries = [];
    if (params.startDate) queries.push(`startDate=${format(params.startDate, "yyyy-MM-dd")}`);
    if (params.endDate) queries.push(`endDate=${format(params.endDate, "yyyy-MM-dd")}`);
    if (params.leader.length) queries.push(`leader=${params.leader.join(",")}`);
    if (params.country.length) queries.push(`country=${params.country.join(",")}`);
    return fetch("/api/event?" + queries.join("&")).then(res => res.json());
  }, { initialData: events })

  const [index, setIndex] = useState(0);

  useEffect(() => {
    let queries = [];
    if (params.startDate) queries.push(`startDate=${format(params.startDate, "yyyy-MM-dd")}`);
    if (params.endDate) queries.push(`endDate=${format(params.endDate, "yyyy-MM-dd")}`);
    if (params.leader.length) queries.push(`leader=${params.leader.join(",")}`);
    if (params.country.length) queries.push(`country=${params.country.join(",")}`);
    fetch("/api/event?" + queries.join("&")).then(res => res.json()).then(res => { queryClient.setQueryData("eventData", res) });
    setIndex(0);
  }, [params.startDate?.getTime(), params.endDate?.getTime(), JSON.stringify(params.leader), JSON.stringify(params.country)])

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

        <EventFilter useParams={[params, setParams]} />

        <Paper elevation={4} sx={{ mx: 5, mt: 3, p: 2, flex: "1 1 300px", borderRadius: 2 }}>
          {!!data?.length &&
            <>
              <Typography
                variant="h6"
                noWrap
                component="div"
              >
                {data[index]?.name}
              </Typography>

              <Box display="flex">
                {!!data[index].country?.name &&
                  <Typography mr={2}>
                    Country: <i>{data[index]?.country?.name}</i>
                  </Typography>
                }
                {!!data[index].leader?.name &&
                  <Typography>
                    Leader: <i>{data[index]?.leader?.name}</i>
                  </Typography>
                }
              </Box>

              <Typography
                component="div"
                mt={2}
                dangerouslySetInnerHTML={{__html: data[index].description || ""}}
              />

            </>}
        </Paper>

      </Box>

    </>
  )
}

export default Home

export async function getStaticProps() {
  const events = await fetch(`${server}/api/event`).then(res => res.json()) || [] as HistoricalEvent[];
  return {
    props: {
      events
    }, // will be passed to the page component as props
  }
}
