import { createFileRoute } from "@tanstack/react-router";
import { b } from "node_modules/vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";
import { useState } from "react";

export const Route = createFileRoute("/quizes")({
  component: Quizes,
});

type Answer = {
  answer: string;
  correctAnswer: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

const questions: Question[] = [
  {
    question: "What is the capital of France?",

    answers: [
      {
        answer: "Paris",
        correctAnswer: true,
      },
      {
        answer: "London",
        correctAnswer: false,
      },
      {
        answer: "Berlin",
        correctAnswer: false,
      },
      {
        answer: "Madrid",
        correctAnswer: false,
      },
    ],
  },
  {
    question: "What is the capital of Germany?",

    answers: [
      {
        answer: "Berlin",
        correctAnswer: true,
      },
      {
        answer: "London",
        correctAnswer: false,
      },
      {
        answer: "Berlin",
        correctAnswer: false,
      },
      {
        answer: "Madrid",
        correctAnswer: false,
      },
    ],
  },
  {
    question: "What is the capital of Italy?",

    answers: [
      {
        answer: "Rome",
        correctAnswer: true,
      },
      {
        answer: "London",
        correctAnswer: false,
      },
      {
        answer: "Berlin",
        correctAnswer: false,
      },
      {
        answer: "Madrid",
        correctAnswer: false,
      },
    ],
  },
];

function Quizes() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isFinished = currentQuestionIndex === questions.length;

  function handleAnswer(answerIndex: number) {
    console.log("===  quizes.tsx [49] ===>", answerIndex);
    setSelectedAnswerIndex(answerIndex);
  }
  function handleSubmit() {
    if (currentQuestion.answers[selectedAnswerIndex as number].correctAnswer) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswerIndex(null);
  }

  function handleRestart() {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setScore(0);
  }

  function QuestionComponent() {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-2xl font-bold">
          Question:{currentQuestionIndex + 1} of {questions.length}
        </p>
        <p className="text-2xl font-bold">{currentQuestion.question}</p>
        <p className="text-2xl font-bold">Score: {score}</p>
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.answers.map((answer, answerIndex) => (
            <button
              key={answer.answer}
              className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${selectedAnswerIndex === answerIndex ? "bg-green-500" : "bg-blue-500"}`}
              onClick={() => handleAnswer(answerIndex)}
            >
              {answer.answer}
            </button>
          ))}
        </div>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
          onClick={handleSubmit}
          disabled={selectedAnswerIndex === null}
        >
          Submit
        </button>
      </div>
    );
  }

  function ResultComponent() {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <p className="text-2xl font-bold">Score: {score}</p>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleRestart()}>
            Restart
          </button>
        </div>
      </>
    );
  }

  return <>{isFinished ? <ResultComponent /> : <QuestionComponent />}</>;
}
