import React, { useState, useEffect } from 'react';
import { List, Typography, Divider, Button, Calendar, Modal, Row, Col, Avatar, Switch, Card, theme } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, InfoCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { formatDate } from "../../../utils/formatDate";
import L from 'leaflet';
import 'leaflet-routing-machine';
import { ProjectSessioningApi } from '../../../provider/gen';
import { getCachedUser } from '../../../utils/getCachedUser';
import { log } from 'console';

const { Title, Text } = Typography;

// Component to handle routing
const RoutingMachine = ({ destination }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        let routingControl = L.Routing.control({
            waypoints: [],
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: 'red', weight: 4 }]
            },
            createMarker: function () { return null; } // Hide start and end markers if not needed
        }).addTo(map);

        map.locate({ setView: true, maxZoom: 13 });

        map.on('locationfound', (e) => {
            routingControl.setWaypoints([
                L.latLng(e.latlng.lat, e.latlng.lng),
                L.latLng(destination.latitude, destination.longitude)
            ]);
        });

        // Cleanup on component unmount
        return () => {
            map.removeControl(routingControl);
        };
    }, [map, destination]);

    return null;
};

export const ProfilePageEvent = () => {
    const [view, setView] = useState('calendar');
    const [selectedProjectSession, setselectedProjectSession] = useState(null);

    const [projectSessions, setProjectSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiInstance = new ProjectSessioningApi();

        const user = getCachedUser()

        const userId = 'manager1_id';
        const page = 1;
        const pageSize = 10;

        apiInstance.getUserProjectSessions(user.id, page, pageSize)
            .then(response => {
                setProjectSessions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching project sessions:", error);
                setLoading(false);
            });
    }, []);

    const handleDateCellRender = (value) => {
        const dateEvents = projectSessions.filter(projectSession => new Date(projectSession.date).toDateString() === value.toDate().toDateString());
        return (
            <ul style={{ padding: 0, margin: 0 }}>
                {dateEvents.map(projectSession => (
                    <li
                        key={projectSession.id}
                        onClick={() => showEventDetails(projectSession)}
                        style={{ cursor: 'pointer', marginBottom: 4 }}
                    >
                        <Text>{projectSession.title}</Text>
                    </li>
                ))}
            </ul>
        );
    };

    const showEventDetails = (projectSession) => {
        setselectedProjectSession(projectSession);
    };

    const handleDateClick = (value) => {
        const date = value.toDate().toDateString();
        const eventsOnDate = projectSessions.filter(projectSession => new Date(projectSession.date).toDateString() === date);
        if (eventsOnDate.length > 0) {
            showEventDetails(eventsOnDate[0]); // Show the first event on the selected date
        }
    };

    const handleModalClose = () => {
        setselectedProjectSession(null);
    };

    const handleSwitchChange = (checked) => {
        setView(checked ? 'calendar' : 'list');
    };

    return (
        <div>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={2}>
                    Project Sessions
                </Title>
                <Title level={5} style={{ marginRight: 20 }}>
                    <Switch
                        checkedChildren={<CalendarOutlined />}
                        unCheckedChildren={<UnorderedListOutlined />}
                        checked={view === 'calendar'}
                        onChange={handleSwitchChange}
                        style={{ marginRight: 16 }}
                    />
                    Switch to {view === 'list' ? 'Calendar' : 'List'} View
                </Title>
            </div>
            <Divider />
            {view === 'list' ? (
                <Row gutter={16}>
                    {projectSessions.map(projectSession => (
                        <Col span={24} key={projectSession.id}>
                            <Card
                                hoverable
                                onClick={() => showEventDetails(projectSession)}
                                style={{ marginBottom: 16, backgroundColor: '#EFF1ED' }}
                            >
                                <Card.Meta
                                    title={<Title style={{ color: '#344E41' }} level={4}>{projectSession.title}</Title>}
                                    description={
                                        <>
                                            <Text style={{ color: '#344E41' }}>
                                                <span style={{ fontWeight: 'bold' }}> Description : </span>
                                                {projectSession.description}
                                            </Text>
                                            <br />
                                            <Text
                                                style={{
                                                    color: projectSession.status === 'NOT_STARTED' ? 'red' :
                                                        projectSession.status === 'IN_PROGRESS' ? 'blue' :
                                                            projectSession.status === 'COMPLETED' ? 'green' : 'black',
                                                }}
                                            >
                                                <InfoCircleOutlined style={{ marginRight: 8 }} />
                                                {projectSession.status}
                                            </Text>
                                            <br />
                                        </>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Calendar
                    cellRender={handleDateCellRender}
                    onSelect={handleDateClick}
                />
            )}

            <Modal
                title={<Title style={{ color: '#344E41'}} level={4.5}>{selectedProjectSession?.title || 'Event Details'}</Title>}
                open={!!selectedProjectSession}
                onCancel={handleModalClose}
                footer={null}
                style={{ maxWidth: '100%', width: '100%'}} // Full width
            >
                {selectedProjectSession && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Row gutter={16}>
                            <Col span={20}>
                                <Text>
                                    <span style={{ fontWeight: 'bold', color: '#344E41' }}> Title : </span>
                                    {selectedProjectSession.project.title}
                                </Text>
                                <br />
                                <Text>
                                    <span style={{ fontWeight: 'bold', color: '#344E41' }}> Description : </span>
                                    {selectedProjectSession.project.description}
                                </Text>
                                <br />
                                <Text level={5} style={{ marginBottom: 30, marginTop: 15, display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ color: '#344E41'}}>
                                        <span style={{ fontWeight: 'bold' }}>Created At : </span>
                                        {formatDate(selectedProjectSession.creation_datetime)}
                                    </div>
                                    <div style={{ color: '#344E41'}}>
                                        <span style={{ fontWeight: 'bold' }}> End: </span>
                                        {formatDate(selectedProjectSession.end_datetime)}
                                    </div>
                                </Text>
                                <Text
                                    style={{
                                        padding: '6px 20px',
                                        borderRadius: 20,
                                        color: selectedProjectSession.status === 'NOT_STARTED' ? 'red' :
                                            selectedProjectSession.status === 'IN_PROGRESS' ? 'blue' :
                                                selectedProjectSession.status === 'COMPLETED' ? 'green' : 'black',

                                        backgroundColor: selectedProjectSession.status === 'NOT_STARTED' ? '#ffdab9' :
                                            selectedProjectSession.status === 'IN_PROGRESS' ? '#e2eafc' :
                                                selectedProjectSession.status === 'COMPLETED' ? '#dde5b6' : 'transparent'
                                    }}
                                >
                                    <InfoCircleOutlined style={{ marginRight: 8 }} />
                                    {selectedProjectSession.status}
                                </Text>
                            </Col>
                        </Row>
                        {selectedProjectSession.latitude && selectedProjectSession.longitude && (
                            <Row style={{ marginTop: 16 }}>
                                <MapContainer
                                    center={[selectedProjectSession.latitude, selectedProjectSession.longitude]}
                                    zoom={13}
                                    style={{ height: "300px", width: "100%" }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[selectedProjectSession.latitude, selectedProjectSession.longitude]}>
                                        <Popup>{selectedProjectSession.title}</Popup>
                                    </Marker>
                                    <RoutingMachine destination={selectedProjectSession} />
                                </MapContainer>
                            </Row>
                        )}
                    </div>
                )}
            </Modal>
            <Divider />
        </div>
    );
};