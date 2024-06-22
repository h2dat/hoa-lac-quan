import React, { useEffect, useState } from 'react'
import { Header } from "./header";
import { About } from "./about";
import {Features} from "./features";
import { Products } from "./products";
import { Contact } from "./contact";
import { Services } from "./services"
import { Cooking } from './howtocook';
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
            <Features data={landingPageData.Features}/>
            <Cooking data={landingPageData.Cooking}/>
            <Products data={landingPageData.Products} />
            <Services data={landingPageData.Services}/>
            <Contact data={landingPageData.Contact} />
            
        </div>

    )
}

