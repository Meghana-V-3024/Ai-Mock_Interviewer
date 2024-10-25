"use client";
import Webcam from "react-webcam";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, Save } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";
import { ChatSession } from "@google/generative-ai";

function RecordAnsSection(mockInterviewQuestion, activeQuestionIndex) {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((preAns) => preAns + result?.transcript);
    });
  }, [results]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        toast(
          "Error while saving  your answer as it was too short,Please Record Again"
        );
        return;
      }
      const feedbackPrompt =
        "Question: " +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", " +
        userAnswer +
        " Depends on question and user answer for given interview question" +
        " Please Give Us Rating for Answer and feedback as area of improvement if any" +
        " in just 3 to 5 line just to improve it in JSON format with rating filed and racing field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      console.log(mockJsonResp);
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-primary rounded-lg p-5">
        {/* <Image src={'/webcam.png'} width={200} height={200} // To insert image for webcam
        className='absolute'/> */}

        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button variant="outline" className="my-10" onClick={SaveUserAnswer}>
        {isRecording ? (
          <h2 className="text-red-600 felx gap-2">
            <Mic /> 'Stop Recording'
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  );
}

export default RecordAnsSection;
