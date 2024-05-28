import Image from "next/image";
import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const { data } = props;
    // console.log('props', data);
    return (
        <div ref={ref} className="w-full hidden print:block">
            <h2 className="text-xl font-semibold text-center">Violation Details</h2>
            <table >
                <thead className="bg-slate-400">
                    <tr className="p-4">
                        <th className="py-2">Driver Name</th>
                        <th>Vehicle Name</th>
                        <th>Violation</th>
                        <th>Timestamp</th>
                        <th>Image References</th>

                        {/* <th>Contact Number</th>
                        <th>Speed</th>
                        <th>Speed Limit</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data?.filter(item => item.imageReferences).map((violationDetails, index) => (
                        <tr className="px-2" key={index}>
                            <td className="ps-2">{violationDetails.driver_name}</td>
                            <td>{violationDetails.vehicle_name}</td>
                            <td>{violationDetails.violation}</td>
                            <td>{violationDetails.timestamp}</td>
                            <td className="pe-2">
                                <Image
                                    // src={showAlert.imageReferences}
                                    src={violationDetails?.imageReferences}
                                    alt='dynamic image'
                                    priority={true}
                                    width={200}
                                    height={100}
                                    className="w-auto h-20"
                                />
                            </td>

                            {/* <td>{violationDetails.contact_number}</td>                            
                            <td>{violationDetails.speed}</td>
                            <td>{violationDetails.speed_limit}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});