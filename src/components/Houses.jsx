import { Collapse } from 'antd';
import {useEffect, useState} from "react";
import {getHouses} from "../utils/api";
import HousingStock from "./HousingStock";


function Houses({streetId}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getHouses(streetId).then(res => {
            setData(res.data)
        })
    }, [])


    return <Collapse items={data.map((house, index) => ({
        key: index + 1,
        label: house.name,
        children: <HousingStock houseId={house.id} streetId={streetId} />,
    }))} />;
}

export default Houses
