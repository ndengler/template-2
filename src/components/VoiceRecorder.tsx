"use client";

import { useState, useEffect } from "react";
import { useDeepgram } from "../lib/contexts/DeepgramContext";
import { addDocument } from "../lib/firebase/firebaseUtils";
import { motion, useAnimation } from "framer-motion";
import { Mic, StopCircle, RotateCcw, Download } from "lucide-react";
import { Button } from "./Button";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const {
    connectToDeepgram,
    disconnectFromDeepgram,
    connectionState,
    realtimeTranscript,
  } = useDeepgram();
  const buttonControls = useAnimation();
  const gradientControls = useAnimation();

  useEffect(() => {
    if (isRecording) {
      buttonControls.start({
        scale: [1, 1.2, 1],
        boxShadow: [
          "0 0 0 0 rgba(239, 68, 68, 0.7)",
          "0 0 0 20px rgba(239, 68, 68, 0)",
          "0 0 0 0 rgba(239, 68, 68, 0)",
        ],
        transition: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        },
      });
      gradientControls.start({
        background: [
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        ],
        transition: { repeat: Infinity, duration: 10, ease: "linear" },
      });
    } else {
      buttonControls.stop();
      buttonControls.start({
        scale: 1,
        boxShadow: "0 0 0 0 rgba(239, 68, 68, 0)",
      });
      gradientControls.stop();
      gradientControls.start({
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      });
    }
  }, [isRecording, buttonControls, gradientControls]);

  const handleStartRecording = async () => {
    await connectToDeepgram();
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    disconnectFromDeepgram();
    setIsRecording(false);

    // Save the note to Firebase
    if (realtimeTranscript) {
      await addDocument("notes", {
        text: realtimeTranscript,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const resetTranscript = () => {
    // Implement reset functionality
  };

  const downloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob([realtimeTranscript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <motion.div
      className="w-full flex items-center justify-center p-10"
      animate={gradientControls}
      initial={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Voice Notes
        </h1>

        <div className="flex justify-center mb-8">
          <motion.div animate={buttonControls} initial={{ scale: 1 }}>
            <Button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`w-28 h-28 rounded-full flex items-center justify-center text-white ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isRecording ? (
                <StopCircle className="w-16 h-16" />
              ) : (
                <Mic className="w-16 h-16" />
              )}
            </Button>
          </motion.div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 h-20 overflow-auto mb-4">
          <p className="text-gray-800 whitespace-pre-wrap">
            {realtimeTranscript}
          </p>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={resetTranscript}
            variant="outline"
            className="flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={downloadTranscript}
            variant="outline"
            className="flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
