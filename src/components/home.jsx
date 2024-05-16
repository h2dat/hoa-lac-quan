import React, { useEffect, useState } from 'react'
import { Header } from "./header";
import { About } from "./about";
import { Products } from "./products";
import { Contact } from "./contact";
import JsonData from "../data/data.json";

export const Home = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);
    return (
        <div>
            <Header data={landingPageData.Header} />
            <About data={landingPageData.About} />
            <Products data={landingPageData.Products} />
            <Contact data={landingPageData.Contact} />
        </div>

    )
}

