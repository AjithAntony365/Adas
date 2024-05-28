"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Flex } from "@tremor/react";

const AuthLayout = ({ children }) => {
    return (
        <Flex
            justifyContent="between"
            alignItems="center"
            className=" min-h-screen bg-contain bg-no-repeat w-full h-full p-4 sm:py-0 bg-[#ff4b06] flex-col sm:flex-row"
        //  bg-[url('/background/Dacio.jpeg')]
        >
            <img className="" src="/background/Dacio.jpeg" alt="logo" />

            <Card className="max-w-md ">
                {children}
            </Card>
        </Flex>
        // <>
        //     <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
        //         <div className="carousel-indicators">
        //             <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        //             <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"  aria-label="slide 2"></button>
        //             <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        //         </div>
        //         <div className="carousel-inner">
        //             <div className="carousel-item active" data-bs-interval="10000">
        //                 <img src="/background/Dacio.jpeg" className="d-block w-100" alt="Slide 1" />
        //                 <div className="carousel-caption d-none d-md-block">
        //                 </div> 
        //             </div> 
        //             <div className="carousel-item" data-bs-interval="2000">
        //                 <img src="/background/cog-bg.jpeg" className="d-block w-100" alt="Slide 2" />
        //                 <div className="carousel-caption d-none d-md-block">
        //                 </div>
        //             </div>
        //             <div className="carousel-item">
        //                 <img src="/background/Dacio.jpeg" className="d-block w-100" alt="Slide 3" />
        //                 <div className="carousel-caption d-none d-md-block">
        //                 </div>
        //             </div>
        //         </div>
        //         <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        //             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        //             <span className="visually-hidden">Previous</span>
        //         </button>
        //         <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        //             <span className="carousel-control-next-icon" aria-hidden="true"></span>
        //             <span className="visually-hidden">Next</span>
        //         </button>
        //     </div>
        // </>
    );
}

export default AuthLayout;
