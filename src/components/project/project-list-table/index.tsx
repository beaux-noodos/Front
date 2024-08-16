import {
    type HttpError,
    useGo,
    useNavigation,
    useTranslate,
} from "@refinedev/core";
import {
    useTable,
} from "@refinedev/antd";
import type {IXxxxxx} from "../../../interfaces";
import {
    Button,
    Input,
    Select,
    Table,
    Typography,
    Row,
    Col,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import {ProjectCreate} from "../../../pages/projects";

export const ProjectListTable = () => {
    const t = useTranslate();
    const go = useGo();
    const { pathname } = useLocation();
    const { showUrl } = useNavigation();

    const {
        tableProps,
        current,
        setCurrent,
        pageSize,
        setPageSize,
        pageCount,
    } = useTable<IXxxxxx, HttpError>();

    const { pagination, ...tablePropsWithoutPagination } = tableProps;

    // Checks if there is a next page available
    const hasNext = current < pageCount;
    // Checks if there is a previous page available
    const hasPrev = current > 1;

    return (
        <>
            <Table
                {...tablePropsWithoutPagination}
                rowKey="id"
                scroll={{ x: true }}
                pagination={false}
            >
                <Table.Column
                    title={
                        <Typography.Text style={{ whiteSpace: "nowrap" }}>
                            ID #
                        </Typography.Text>
                    }
                    dataIndex="id"
                    key="id"
                    width={80}
                    render={(value) => (
                        <Typography.Text style={{ whiteSpace: "nowrap" }}>
                            {value}
                        </Typography.Text>
                    )}
                />

                <Table.Column
                    title={t("date.creation_datetime")}
                    dataIndex="creation_datetime"
                    key="creation_datetime"
                    render={(value: string) => (
                        <Typography.Text style={{ whiteSpace: "nowrap" }}>
                            {value}
                        </Typography.Text>
                    )}
                />

                <Table.Column
                    title={t("date.updated_at")}
                    dataIndex="updated_at"
                    key="updated_at"
                    render={(value: string) => (
                        <Typography.Text style={{ whiteSpace: "nowrap" }}>
                            {value}
                        </Typography.Text>
                    )}
                />

                <Table.Column
                    title={t("users.fields.firstName")}
                    dataIndex={["user", "first_name"]}
                    key="user.first_name"
                    render={(value: string) => (
                        <Typography.Text style={{ whiteSpace: "nowrap" }}>
                            {value}
                        </Typography.Text>
                    )}
                />

                <Table.Column
                    title={t("table.actions")}
                    key="actions"
                    fixed="right"
                    align="center"
                    render={(_, record: IXxxxxx) => (
                        <Button
                            icon={<EyeOutlined />}
                            onClick={() => go({
                                to: `${showUrl("projects", record.id)}`,
                                query: { to: pathname },
                                options: { keepQuery: true },
                                type: "replace",
                            })}
                        />
                    )}
                />
            </Table>

            <Row gutter={[16, 16]} align="middle" style={{ marginBlock: '16px' }}>
                <Col>
                    <span>
                        Go to page:{" "}
                        <Input
                            type="number"
                            value={current}
                            min={1}
                            onChange={(e) => {
                                const value = Math.max(Number(e.target.value), 1);
                                setCurrent(value);
                            }}
                            style={{ width: 60 }}
                        />
                    </span>
                </Col>
                <Col>
                    <Select
                        value={pageSize}
                        onChange={(value) => setPageSize(value)}
                        style={{ width: 120 }}
                    >
                        {[5, 10, 20, 30, 40, 50].map((size) => (
                            <Select.Option key={size} value={size}>
                                Show {size}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>
        </>
    );
};