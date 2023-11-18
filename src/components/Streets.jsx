import { Collapse } from 'antd';
import {useEffect, useState} from "react";
import { getStreets } from "../utils/api";


const itemsNest = [
    {
        key: '1',
        label: 'This is panel nest panel',
        children: <p>test</p>,
    },
];



function List() {
    const [streets, setStreets] = useState([]);
    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        getStreets().then(res => {
            setStreets(res.data)
        })
    }, [])

    const onChange = (key) => {
        console.log(key);
    };

    return <Collapse onChange={onChange} items={streets.map((street, index) => ({
        key: index + 1,
        label: street.name,
        children: <Collapse defaultActiveKey="1" items={itemsNest} />,
    }))} />;
}

export default List