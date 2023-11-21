import {useEffect, useState} from "react";
import {Drawer, Col, Row, Spin, Button, Form, Input, Space, message} from "antd";
import {createClient, deleteClient, getClients} from "../utils/api";
import Client from "./Client";

function Clients({addressId, onCancel, houses}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submittable, setSubmittable] = useState(false);

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    const handleClientRemove = id => {
        deleteClient(id).then(() => {
            message.success(`Client has been removed`)
            setData(data.filter(client => client.id != id))
        })

    }

    const onClientAdd = body => {
        createClient(body).then(res => {
            message.success(`Client ${body.name} is successfully added`)
            setData([...data, {...body, id: res.data.id}])
            form.resetFields()
        }).catch(() => {
            message.error('Something went wrong')
        })
    }

    useEffect(() => {
        if (addressId) {
            setLoading(true)
            getClients(addressId).then(res => {
                if (res.data) {
                    setData(res.data)
                }
            }).catch(err => {
                console.log(err)
            }).finally(() => setLoading(false))
        }
    }, [addressId])

    useEffect(() => {
        form
            .validateFields({
                validateOnly: true,
            })
            .then(
                () => {
                    setSubmittable(true);
                },
                () => {
                    setSubmittable(false);
                },
            );
    }, [values])

    return (
        <Drawer width={800} title={'Client list'} open={addressId} onClose={onCancel}>
            {loading ? <Spin size='large' /> : (
                <Row gutter={[4, 4]}>
                    {data.map(client => (
                        <Col span={8} key={client.id}>
                            <Client
                                onClientRemove={handleClientRemove}
                                client={client}
                                houses={houses} />
                        </Col>
                    ))}
                </Row>
            )}

            <h2>Add client</h2>
            <Form onFinish={onClientAdd} form={form} name="validateOnly" layout="vertical" autoComplete="off">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" disabled={!submittable}>
                            Submit
                        </Button>
                        <Button htmlType="reset">Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default Clients
