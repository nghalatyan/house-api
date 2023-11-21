import {useState} from "react";
import {PhoneOutlined, RedEnvelopeOutlined} from "@ant-design/icons";
import {Button, Card, Select, Space, message} from "antd";
import {bindClient} from "../utils/api";

function Client({client, onClientRemove, houses}) {
    const [selectedHouse, setSelectedHouse] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClientBind = (id) => {
        setLoading(true)
        bindClient(id, selectedHouse).then(() => {
            message.success('Client has been successfully bound to selected house');
            setSelectedHouse('')
        }).finally(() => setLoading(false))
    }

    return (
        <Card title={client.name}>
            <div><PhoneOutlined /> : {client.phone}</div>
            <div><RedEnvelopeOutlined />: {client.email}</div>
            <Button onClick={() => onClientRemove(client.id)} type="primary" danger>
                Remove
            </Button>
            <Space direction="vertical">
                <h5>Bind to another house</h5>
                <Select
                    onChange={setSelectedHouse}
                    value={selectedHouse}
                    style={{width: 200}}>
                        {houses.map(house => (
                            <Select.Option
                                key={house.addressId}
                                value={house.addressId}>
                                    {house.flat}
                            </Select.Option>
                        ))}
                </Select>
                <Button
                    onClick={() => handleClientBind(client.id)}
                    disabled={!selectedHouse}
                    loading={loading}
                    type="primary">
                        Bind
                </Button>
            </Space>
        </Card>
    )
}

export default Client;
