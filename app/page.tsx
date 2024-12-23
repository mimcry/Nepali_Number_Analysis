"use client"
import DrawingCanvas from '@/components/DrawingCanvas'
import { useState } from 'react'
import { Brain, Share2, Timer } from 'lucide-react'

export default function Home() {
 
  
  return (
    <main className="min-h-screen relative">
   
      <div className="relative container mx-auto px-4 py-8 ">
        {/* Header Section */}
        <div className="text-center mb-8">
         
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            Nepali Number Analysis
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Analyze Nepali numerals using K-Nearest Neighbors (KNN) and machine learning algorithms
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Drawing Section  */}
          <div className="md:col-span-3 bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Draw Nepali Number</h2>
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
          <div className="md:col-span-2 space-y-6">
            {/* Prediction Results */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">Analysis Results</h2>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-2">Predicted Number</p>
                  <p className="text-4xl font-bold text-blue-400">
                 -
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Confidence: -
                  </p>
                </div>
              </div>
            </div>

            {/* Algorithm Details */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">Algorithm Details</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-gray-200">K-Nearest Neighbors</h3>
                  <p className="text-sm text-gray-400">Primary classification algorithm</p>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-gray-200">Image Processing</h3>
                  <p className="text-sm text-gray-400">Preprocessing & feature extraction</p>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-medium text-gray-200">Real-time Analysis</h3>
                  <p className="text-sm text-gray-400">Instant predictions as you draw</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Section */}
        <div className="mt-8 bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">About Nepali Numbers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-200">Number System</h3>
              <p className="text-gray-400 text-sm">
                Nepali numbers (०, १, २, ३, ४, ५, ६, ७, ८, ९) are part of the 
                Devanagari script, used in Nepal. Each number 
                has distinct characteristics that our ML model learns to recognize.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-200">ML Analysis</h3>
              <p className="text-gray-400 text-sm">
                Our KNN algorithm analyzes your drawn number by comparing it with 
                thousands of training examples, finding the closest matches to make 
                accurate predictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}