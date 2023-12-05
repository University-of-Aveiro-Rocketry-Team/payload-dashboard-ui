import mqtt from 'mqtt';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';


export default function VisualizerCard({ title, ...other }) {
  const clientId = `dashboard_${Math.random().toString(16).substring(2, 8)}`;
  const username = `${import.meta.env.VITE_MQTT_USERNAME}`;
  const password = `${import.meta.env.VITE_MQTT_PASSWORD}`;
  const mqttTopic = 'mpu6500';
  const host = `ws://${import.meta.env.VITE_API_IP || 'localhost'}:9001`;

  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [client, setClient] = useState(null);

  // Connect to MQTT broker when component mounts
  useEffect(() => {
    if (!client) {
      console.log('Connecting to MQTT broker...');
      
      const mqttClient = mqtt.connect(host, {
        clientId,
        username,
        password,
      });

      setClient(mqttClient);
    }

    if (client) {
      console.log('Connected to MQTT broker');

      client.on('connect', () => {
        client.subscribe(mqttTopic, (error) => {
          if (error) {
            console.error('Subscription error:', error);
          }
        });
      });

      client.on('message', (topic, message) => {
        if (topic === mqttTopic) {
          setGyroData(JSON.parse(message));
          console.log('Received message:', message.toString());
        }
      });

      client.on('error', (err) => {
        console.error('Connection error:', err);
      });

      client.on('reconnect', () => {
        console.log('Reconnecting...');
      });
    }
  }, [client, clientId, host, mqttTopic, password, username]);

  return (
    <Card {...other} style={{ height: '500px' }}>
      <CardHeader title={title} />
      {/* <ThreeDCube rotation={gyroData} /> */}
    </Card>
  );
}

VisualizerCard.propTypes = {
  title: PropTypes.string,
};
