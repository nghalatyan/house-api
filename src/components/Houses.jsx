import { Collapse } from 'antd';
import {useEffect, useState} from "react";
import {getHouses} from "../utils/api";



const itemsNest = [
    {
        key: '1',
        label: 'This is panel nest panel',
        children: <p>test</p>,
    },
];


function HousingStock({streetId}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getHouses(streetId).then(res => {
            console.log(res)
            setData(res.data)
        })
    }, [])

    const onChange = (key) => {
        console.log(key);
    };


    return <Collapse onChange={onChange} items={data.map((house, index) => ({
        key: index + 1,
        label: house.name,
        children: <Collapse defaultActiveKey="1" items={itemsNest} />,
    }))} />;
}

export default HousingStock