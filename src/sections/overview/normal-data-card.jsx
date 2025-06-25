import mqtt from 'mqtt';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

export default function NormalDataCard({ title, ...other }) {
  // MQTT setup variables
  const clientId = `dashboard_${Math.random().toString(16).substring(2, 8)}`;
  const username = `${import.meta.env.VITE_MQTT_USERNAME}`;
  const password = `${import.meta.env.VITE_MQTT_PASSWORD}`;
  const mqttTopic = 'mpu6500';
  const host = `wss://${import.meta.env.VITE_MQTT_IP || 'localhost'}:9001`;

  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Connect to MQTT broker when component mounts
    if (!client) {
      const mqttClient = mqtt.connect(host, {
        clientId,
        username,
        password,
      });

      setClient(mqttClient);
    }

    // Subscribe to topic when client connects
    if (client) {
      client.on('connect', () => {
        client.subscribe(mqttTopic, (error) => {
          if (error) {
            console.error('Subscription error:', error);
          }
        });

        client.removeAllListeners('connect');
        client.removeAllListeners('error');
      });

      client.on('message', (topic, message) => {
        if (topic === mqttTopic) {
          const mpu6500Data = JSON.parse(message.toString());
          setGyroData({
            x: mpu6500Data.data.gyroscope_x,
            y: mpu6500Data.data.gyroscope_y,
            z: mpu6500Data.data.gyroscope_z,
          });
        }
      });
    }
  }, [client, clientId, host, mqttTopic, password, username]);

  return (
    <Card {...other} style={{ height: '650px' }}>
      <CardHeader title={title} sx={{ mb: 8 }} />

      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(6, 1fr)',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: '70px',
        }}
      >
        <div>
          <h2>Pitch</h2>
          <div>{gyroData.y.toFixed(0)} °</div>
        </div>

        <div>
          <h2>Yaw</h2>
          <div>{gyroData.z.toFixed(0)} °</div>
        </div>

        <div>
          <h2>Roll</h2>
          <div>{gyroData.x.toFixed(0)} °</div>
        </div>
      </div>
    </Card>
  );
}

NormalDataCard.propTypes = {
  title: PropTypes.string,
};
