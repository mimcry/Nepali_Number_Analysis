"use client";
import DrawingCanvas from "@/components/DrawingCanvas";
import { useState, useEffect } from "react";
import { Brain, Share2, Timer, ArrowRight } from "lucide-react";
import Image from "next/image";
import Lottie from "react-lottie-player";
import animationData from "../public/animation-thinking.json";
// Backend dummy data
const fetchDataFromBackend = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    algorithms: ["knn", "kmeans", "ann", "svm"],
    algorithmNames: {
      knn: "K-Nearest Neighbors",
      kmeans: "K-Means Clustering",
      ann: "Artificial Neural Network",
      svm: "Support Vector Machine",
    },
    predictions: {
      knn: {
        number: "५",
        accuracy: 0.95,
        precision: 0.94,
        recall: 0.95,
        f1Score: 0.94,
      },
      kmeans: {
        number: "५",
        accuracy: 0.92,
        precision: 0.91,
        recall: 0.92,
        f1Score: 0.91,
      },
      ann: {
        number: "५",
        accuracy: 0.97,
        precision: 0.96,
        recall: 0.97,
        f1Score: 0.96,
      },
      svm: {
        number: "५",
        accuracy: 0.96,
        precision: 0.95,
        recall: 0.96,
        f1Score: 0.95,
      },
    },
  };
};

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("knn");
  const [backendData, setBackendData] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async () => {
    setIsLoading(true);
    setShowPrediction(false);
    const data = await fetchDataFromBackend();
    setBackendData(data);
    setShowPrediction(true);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen relative">
      <div className="relative container mx-auto px-4 py-8 ">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            Nepali Number Analysis
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Analyze Nepali numerals using various machine learning algorithms
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Drawing Section  */}
          <div className="md:col-span-3 bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700 items-center justify-center">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-200">
                Draw Nepali Number
              </h2>
              <button
                onClick={handlePredict}
                className="px-4 py-2  bg-gradient-to-r from-purple-600 to-blue-600 mb-4 text-white rounded-lg flex items-center space-x-2  transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Predicting...</span>
                ) : (
                  <>
                    <span>Predict</span>
                  </>
                )}
              </button>
            </div>
            <DrawingCanvas />

            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <Timer className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                <p className="text-sm text-gray-300">Real-time Analysis</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <Brain className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                <p className="text-sm text-gray-300">ML-Powered</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <Share2 className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                <p className="text-sm text-gray-300">Share Results</p>
              </div>
            </div>
          </div>

          {/* Analysis Section  */}
          <div className="md:col-span-2 space-y-6 ">
            {/* Prediction Results */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">
                {showPrediction && backendData
                  ? "Prediction Results"
                  : isLoading
                  ? "Predicting Results..."
                  : "Predicted Results will appear here please draw any nepali number in canvas to predict."}
              </h2>

              {showPrediction && backendData ? (
                <div className="space-y-3">
                  {backendData.algorithms.map((algo) => (
                    <div
                      key={algo}
                      className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium text-gray-200">
                          {backendData.algorithmNames[algo]}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Accuracy:{" "}
                          {(
                            backendData.predictions[algo].accuracy * 100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-blue-400">
                          Predicted : {backendData.predictions[algo].number}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : isLoading ? (
                <Lottie
                  loop
                  animationData={animationData}
                  play
                  style={{ width: 400, height: 400, margin: "auto" }} // Adjust size as needed
                />
              ) : (
                <div className="mt-20">
                  <img src="/no-search.png" alt="" className="w-2/3 m-auto" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Algorithm Metrics Section */}
        {showPrediction && backendData && (
          <div className="mt-8 bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">
              Algorithm Metrics
            </h2>
            <div className="mb-4 flex space-x-2">
              {backendData.algorithms.map((algo) => (
                <button
                  key={algo}
                  className={`px-4 py-2 rounded-lg ${
                    selectedAlgorithm === algo
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedAlgorithm(algo)}
                >
                  {backendData.algorithmNames[algo]}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  Metrics
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">
                    Accuracy:{" "}
                    {backendData.predictions[
                      selectedAlgorithm
                    ].accuracy.toFixed(3)}
                  </p>
                  <p className="text-sm text-gray-300">
                    Precision:{" "}
                    {backendData.predictions[
                      selectedAlgorithm
                    ].precision.toFixed(3)}
                  </p>
                  <p className="text-sm text-gray-300">
                    Recall:{" "}
                    {backendData.predictions[selectedAlgorithm].recall.toFixed(
                      3
                    )}
                  </p>
                  <p className="text-sm text-gray-300">
                    F1-Score:{" "}
                    {backendData.predictions[selectedAlgorithm].f1Score.toFixed(
                      3
                    )}
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  Confusion Matrix
                </h3>
                <div className="flex justify-center">
                  <Image
                    src={`/no-search.png`}
                    alt={`Confusion Matrix for ${backendData.algorithmNames[selectedAlgorithm]}`}
                    width={250}
                    height={250}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Section */}
        <div className="mt-8 bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            About Nepali Numbers
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-200">Number System</h3>
              <p className="text-gray-400 text-sm">
                Nepali numbers (०, १, २, ३, ४, ५, ६, ७, ८, ९) are part of the
                Devanagari script, used in Nepal. Each number has distinct
                characteristics that our ML model learns to recognize.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-200">ML Analysis</h3>
              <p className="text-gray-400 text-sm">
                Our algorithms analyze your drawn number by comparing it with
                thousands of training examples, using various techniques to make
                accurate predictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
