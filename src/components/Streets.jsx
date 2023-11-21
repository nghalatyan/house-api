import {Collapse, Empty} from 'antd';
import {useEffect, useState} from "react";
import { getStreets } from "../utils/api";
import Houses from "./Houses";

function Streets() {
    const [streets, setStreets] = useState([]);

    useEffect(() => {
        getStreets().then(res => {
            setStreets(res.data)
        })
    }, [])


    if (streets.length) {
        return <Collapse items={streets.map((street, index) => ({
            key: index + 1,
            label: street.name,
            children: <Houses streetId={street.id} />,
        }))} />
    }

    return <Empty />
}

export default Streets
