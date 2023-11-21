import {useEffect, useState} from "react";
import { getHousingStock} from "../utils/api";
import Clients from "./Clients";
import {Button, Spin} from "antd";

function HousingStock({houseId, streetId}) {
    const [data, setData] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        setLoading(true)
        getHousingStock(houseId, streetId).then(res => {
            setData(res.data)
        }).finally(() => setLoading(false))
    }, [])



    return <>
        {loading ? <Spin /> : (
            <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                {data.map(housingStock => (
                    <Button style={{width: '100%'}}
                            key={housingStock.id}
                            onClick={() => setSelectedHouse(housingStock.addressId)}
                    >
                        {housingStock.flat}
                    </Button>
                ))}
            </div>
        )}
        <Clients onCancel={() => setSelectedHouse(null)} addressId={selectedHouse} houses={data} />
    </>

}

export default HousingStock
