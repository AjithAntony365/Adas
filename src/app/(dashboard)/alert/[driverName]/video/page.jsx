"use client";
import { Card, Col, Grid, Subtitle, Text } from "@tremor/react";
import axios from "axios";
import Image from "next/image";
import useSWR from "swr";

const fetcher = url => axios.get(url).then(res => res.data)
const VideoAlertPage = ({ params }) => {
    const { data, error } = useSWR(`/api/drivers/${params?.driverName}`, fetcher, { refreshInterval: 1000 })
    if (error) {
        return null
    }
    console.log('data', data?.filteredvideo);
    return (
        <Grid numItems={1} numItemsLg={4} className="gap-3 p-2">
            {
                data?.filteredvideo.map(item => <AlertBox key={item._id} item={item} />)
            }
        </Grid>
    )
}

export default VideoAlertPage;

const AlertBox = ({ item }) => {
    return (
        <Col numColSpan={1}>
            <Card className="p-2 text-center">
                {/* <Image src={item?.VideoReferences} alt="" width={150} height={100} className="w-full max-h-min" /> */}
                <video
                    // key={data[currentIndex]?._id}
                    controls className="">
                    <source src={item?.VideoReferences} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Subtitle className="my-2">{item?.violation}</Subtitle>
                <Text>
                    {item?.timestamp}
                </Text>
            </Card>
        </Col>
    )
}