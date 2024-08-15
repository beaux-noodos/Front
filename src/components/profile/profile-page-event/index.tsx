import React, { useState, useEffect } from 'react';
import { List, Typography, Divider, Button, Calendar, Modal, Row, Col, Avatar, Switch, Card } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, InfoCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { formatDate } from "../../../utils/formatDate";
import L from 'leaflet';
import 'leaflet-routing-machine';

const { Title, Text } = Typography;

// Mock event data
const mockEvents = [
    {
        id: 1,
        title: 'Event 1',
        date: '2024-08-15T10:00:00Z',
        description: 'This is the first event.',
        latitude: 48.8566,
        longitude: 2.3522,
    },
    {
        id: 2,
        title: 'Event 2',
        date: '2024-08-16T14:00:00Z',
        description: 'This is the second event.',
        latitude: 40.7128,
        longitude: -74.0060,
    },
    {
        id: 3,
        title: 'Event 3',
        date: '2024-08-22T16:00:00Z',
        description: 'This is the third event.',
        latitude: -18.870672412686748,
        longitude: 47.53471906696079,
    },
    {
        id: 4,
        title: 'Event 4',
        date: '2024-08-17T09:00:00Z',
        description: 'This is the fourth event.',
    },
    {
        id: 5,
        title: 'Event 5',
        date: '2024-08-18T11:00:00Z',
        description: 'This is the fifth event.',
    }
];

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
            createMarker: function() { return null; } // Hide start and end markers if not needed
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
    const [view, setView] = useState('calendar'); // Toggle between 'list' and 'calendar'
    const [selectedEvent, setSelectedEvent] = useState(null); // For storing selected event

    const events = mockEvents; // Use mock data

    const handleDateCellRender = (value) => {
        const dateEvents = events.filter(event => new Date(event.date).toDateString() === value.toDate().toDateString());
        return (
            <ul style={{ padding: 0, margin: 0 }}>
                {dateEvents.map(event => (
                    <li
                        key={event.id}
                        onClick={() => showEventDetails(event)}
                        style={{ cursor: 'pointer', marginBottom: 4 }}
                    >
                        <Text>{event.title}</Text>
                    </li>
                ))}
            </ul>
        );
    };

    const showEventDetails = (event) => {
        setSelectedEvent(event);
    };

    const handleDateClick = (value) => {
        const date = value.toDate().toDateString();
        const eventsOnDate = events.filter(event => new Date(event.date).toDateString() === date);
        if (eventsOnDate.length > 0) {
            showEventDetails(eventsOnDate[0]); // Show the first event on the selected date
        }
    };

    const handleModalClose = () => {
        setSelectedEvent(null);
    };

    const handleSwitchChange = (checked) => {
        setView(checked ? 'calendar' : 'list');
    };

    return (
        <div>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={2}>
                    Events
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
                    {events.map(event => (
                        <Col span={24} key={event.id}>
                            <Card
                                hoverable
                                onClick={() => showEventDetails(event)}
                                style={{ marginBottom: 16 }}
                            >
                                <Card.Meta
                                    title={<Title level={4}>{event.title}</Title>}
                                    description={
                                        <>
                                            <Text>
                                                <CalendarOutlined style={{ marginRight: 8 }} />
                                                {formatDate(event.date)}
                                            </Text>
                                            <br />
                                            <Text>
                                                <InfoCircleOutlined style={{ marginRight: 8 }} />
                                                {event.description}
                                            </Text>
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
                title={<Title level={4}>{selectedEvent?.title || 'Event Details'}</Title>}
                open={!!selectedEvent}
                onCancel={handleModalClose}
                footer={null}
                style={{ maxWidth: '100%', width: '100%' }} // Full width
            >
                {selectedEvent && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Row gutter={16}>
                            <Col span={4}>
                                <Avatar icon={<CalendarOutlined />} size={64} />
                            </Col>
                            <Col span={20}>
                                <Title level={5} style={{ marginBottom: 0 }}>
                                    <CalendarOutlined style={{ marginRight: 8 }} />
                                    {formatDate(selectedEvent.date)}
                                </Title>
                                <Text style={{ display: 'block', marginBottom: 8 }}>
                                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                                    {new Date(selectedEvent.date).toLocaleTimeString()}
                                </Text>
                                <Text>
                                    <InfoCircleOutlined style={{ marginRight: 8 }} />
                                    {selectedEvent.description}
                                </Text>
                            </Col>
                        </Row>
                        {selectedEvent.latitude && selectedEvent.longitude && (
                            <Row style={{ marginTop: 16 }}>
                                <MapContainer
                                    center={[selectedEvent.latitude, selectedEvent.longitude]}
                                    zoom={13}
                                    style={{ height: "300px", width: "100%" }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[selectedEvent.latitude, selectedEvent.longitude]}>
                                        <Popup>{selectedEvent.title}</Popup>
                                    </Marker>
                                    <RoutingMachine destination={selectedEvent} />
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