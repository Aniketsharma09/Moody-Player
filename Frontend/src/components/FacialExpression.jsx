import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import "./facialExpression.css"
import axios  from 'axios';

export default function FacialExpression({setSongs}) {
    const videoRef = useRef();

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error("Error accessing webcam: ", err));
    };

    async function detectMood() {

        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();
        let mostProableExpression = 0
        let _expression = '';

        if (!detections || detections.length === 0) {
            console.log("No face detected");
            return;
        }

        for (const expression of Object.keys(detections[ 0 ].expressions)) {
            if (detections[ 0 ].expressions[ expression ] > mostProableExpression) {
                mostProableExpression = detections[ 0 ].expressions[ expression ]
                _expression = expression;
            }
        }
        const output = await axios.get(`http://localhost:3000/songs?mood=${_expression}`)
        setSongs(output.data.song);
        console.log(_expression);
        
        
    }

    useEffect(() => {
        loadModels().then(startVideo);
    }, []);

    return (
        <div className='mood-element' >
            <video
                ref={videoRef}
                autoPlay
                muted
                className='user-video-feed'
            />
            <div className='mood-right'>
            <h1>Live Mood Detection</h1>
            <h2>Click on below button to generate the playlist according to your mood</h2>
            <button onClick={detectMood}>Detect Mood</button>
            </div>
        </div>
    );
}
