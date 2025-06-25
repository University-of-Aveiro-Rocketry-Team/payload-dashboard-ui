import mqtt from 'mqtt';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';

// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';


export default function VisualizerCard({ title, ...other }) {
  // MQTT setup variables
  const clientId = `dashboard_${Math.random().toString(16).substring(2, 8)}`;
  const username = `${import.meta.env.VITE_MQTT_USERNAME}`;
  const password = `${import.meta.env.VITE_MQTT_PASSWORD}`;
  const mqttTopic = 'mpu6500';
  const host = `wss://${import.meta.env.VITE_API_IP || 'localhost'}:9001`;

  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [client, setClient] = useState(null);
  const threeContainer = useRef(null);
  const [cube, setCube] = useState(null);
  const [edgeLines, setEdgeLines] = useState(null);

  // Three.js setup
  useEffect(() => {
    const containerWidth = threeContainer.current.getBoundingClientRect().width;
    const containerHeight = threeContainer.current.getBoundingClientRect().height - 80;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);

    // Setting alpha to true for transparent background
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    threeContainer.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 3, 1);  
    const material = new THREE.MeshBasicMaterial({
      color: 0x5a5a5a,
      transparent: true,
      opacity: 0.5,
    });
    const newCube = new THREE.Mesh(geometry, material);

    const edges = new EdgesGeometry(geometry);
    const lineMaterial = new LineBasicMaterial({ color: 0xffffff });
    const newEdgeLines = new LineSegments(edges, lineMaterial);

    scene.add(newCube);
    scene.add(newEdgeLines);

    setCube(newCube);
    setEdgeLines(newEdgeLines);

    camera.position.z = window.innerWidth < 600 ? 3 : 2.8;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.setSize(containerWidth, containerHeight);
      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    animate();

    setCube(newCube);
  }, []);

  useEffect(() => {
    // Connect to MQTT broker when component mounts
    if (!client) {
      console.log('Connecting to MQTT broker...');

      const mqttClient = mqtt.connect(host, {
        clientId,
        username,
        password,
      });

      setClient(mqttClient);
    }

    // Subscribe to topic when client connects
    if (client) {
      console.log('Connected to MQTT broker');

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
          // console.log('Received message:', message.toString());
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

  // Update the cube rotation based on gyro data
  useEffect(() => {
    if (cube) {
      cube.rotation.x = gyroData.x * (Math.PI / 180);
      cube.rotation.y = gyroData.y * (Math.PI / 180);
      cube.rotation.z = gyroData.z * (Math.PI / 180);

      edgeLines.rotation.x = cube.rotation.x;
      edgeLines.rotation.y = cube.rotation.y;
      edgeLines.rotation.z = cube.rotation.z;
    }
  }, [cube, edgeLines, gyroData]);

  return (
    <Card {...other} style={{ height: '650px' }}>
      <CardHeader title={title} />
      <div ref={threeContainer} style={{ width: '100%', height: '100%' }} />
    </Card>
  );
}

VisualizerCard.propTypes = {
  title: PropTypes.string,
};
