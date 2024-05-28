import { Button, Flex } from "@tremor/react";
import Link from "next/link";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
export function VideoAlert({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    // console.log('data', data);
    return (
        <div>
            <video
                key={data[currentIndex]?._id}
                controls className="mx-auto h-44">
                <source src={data[currentIndex]?.VideoReferences} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Flex className="mt-2">
                <Button
                    icon={FaAngleLeft}
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1))}
                />
                <p>{data[currentIndex]?.violation}</p>
                <Button
                    icon={FaAngleRight}
                    disabled={currentIndex === data?.length - 1}
                    onClick={() => setCurrentIndex(prevIndex => Math.min(data.length - 1, prevIndex + 1))}
                />
            </Flex>
            <Link href={`/alert/${data?.[0]?.driver_name}/video`} className="text-xs border">all</Link>
        </div>
    );
}
