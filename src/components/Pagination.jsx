import { Card, Flex, Button } from "@tremor/react";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const Pagination = ({ itemsPerPage, setCurrentPage, setItemsPerPage, totalPages, currentPage }) => {
    return (
        <Card className="px-2 md:px-3 lg:px-4">
            <Flex justifyContent="end" className="gap-2 flex-col lg:flex-row max-w-xs lg:max-w-2xl me-0 ms-auto">
                <Flex>
                    <div className="text-sm lg:text-base">
                        Rows per page:{' '}
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="text-black border border-black"
                        >
                            {[10, 20, 50, 100].map((size) => (
                                <option key={size} value={size}>
                                    Show {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <span className="text-sm lg:text-base">
                        Page {totalPages ? currentPage : 0} of {totalPages}
                    </span>
                </Flex>
                <Flex className="max-w-xs lg:max-w-[15.5rem]">
                    <Button
                        icon={FaAnglesLeft}
                        disabled={currentPage == 1}
                        onClick={() => setCurrentPage(1)}
                    />
                    <Button
                        icon={FaAngleLeft}
                        disabled={currentPage == 1}
                        onClick={() => setCurrentPage(prevPage => Math.max(1, prevPage - 1))}
                    // onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                    />
                    <Button
                        icon={FaAngleRight}
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(prevPage => Math.min(totalPages, prevPage + 1))}
                    // onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    />
                    <Button
                        icon={FaAnglesRight}
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(totalPages)}
                    />
                </Flex>
            </Flex>
        </Card>
    )
}

export default Pagination;