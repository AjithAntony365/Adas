'use client'
import { useState, useMemo } from "react";
import { Card, Flex, Button } from '@tremor/react';
import Image from 'next/image';
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

const RankList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const transformedData = useMemo(() => {
    return data?.map(driver => ({
      Rank: driver?.Rank,
      image_path: driver?.image_path,
      driver_name: driver?.driver_name,
      vehicle_name: driver?.vehicle_name,
      total_safety_score: driver?.total_safety_score,
    })).sort((a, b) => a.Rank - b.Rank);
  }, [data]);

  const totalPages = Math.ceil(transformedData?.length / 25);
  const startIndex = (currentPage - 1) * 25;
  const endIndex = startIndex + 25;
  const currentPageData = transformedData?.slice(startIndex, endIndex);

  return (
    <div className='space-y-4 overflow-auto md:h-96 scroll-container'>
      {currentPageData && currentPageData.map((driver, index) => (
        <Card className='p-2 md:px-4 md:py-3 w-full' key={index}>
          <Flex>
            <span className="font-medium mr-2">{driver?.Rank}</span>
            <Image
              src={driver?.image_path}
              alt='Placeholderimage'
              width={40}
              height={40}
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white" />
            <span className="flex-1 ml-4">{driver?.driver_name}</span>
            <span className="flex-1 ml-4">{driver?.vehicle_name}</span>
            <span className={`font-semibold text-lg ${getScoreColor(driver?.total_safety_score)}`}>{driver?.total_safety_score.toFixed(2)}</span>
          </Flex>
        </Card>
      ))}
      {transformedData?.length > 25 &&
        <Card className="p-2 md:p-4">
          <Flex justifyContent='end' className="gap-2">
            <span className="text-xs md:text-base">
              Page {totalPages ? currentPage : 0} of {totalPages}
            </span>
            <Button
              icon={FaAnglesLeft}
              onClick={() => handlePageChange(1)}
            />
            <Button
              icon={FaAngleLeft}
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              } />
            <Button
              icon={FaAngleRight}
              onClick={() =>
                handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
              }
            />
            <Button
              icon={FaAnglesRight}
              onClick={() => handlePageChange(totalPages)}
            />
          </Flex>
        </Card>}
    </div>
  );
};

export default RankList;

const getScoreColor = (score) => {
  if (score >= 1 && score <= 20) {
      return 'text-rose-500';
  } else if (score > 20 && score <= 50) {
      return 'text-orange-500';
  } else if (score > 50 && score <= 80) {
      return 'text-yellow-500';
  } else if (score > 80 && score <= 100) {
      return 'text-emerald-500';
  } else {
      return 'text-gray-800'; // Default color for scores out of specified ranges
  }
};