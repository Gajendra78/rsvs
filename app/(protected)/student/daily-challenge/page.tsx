'use client';

import { useState } from 'react';
import { Trophy, Clock, CheckCircle2, XCircle, ChevronRight, Star } from 'lucide-react';

export default function DailyChallengePage() {
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const challenge = {
    date: 'March 9, 2026',
    subject: 'General Knowledge',
    question: 'Who was the first woman to win a Nobel Prize?',
    options: [
      { id: 1, text: 'Marie Curie' },
      { id: 2, text: 'Mother Teresa' },
      { id: 3, text: 'Rosalind Franklin' },
      { id: 4, text: 'Ada Lovelace' }
    ],
    correctOption: 1,
    explanation: 'Marie Curie was the first woman to win a Nobel Prize, in Physics, and with her later win in Chemistry, she became the first person to claim Nobel honors twice.',
    reward: 10
  };

  const handleAnswer = (id: number) => {
    if (answered) return;
    setSelectedOption(id);
    setAnswered(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-amber-100 text-amber-600 rounded-full mb-4">
          <Trophy className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Daily Challenge</h2>
        <p className="text-gray-500 mt-2">Answer correctly to earn points and maintain your streak!</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex justify-between items-center">
          <div>
            <span className="text-blue-100 text-sm font-medium uppercase tracking-wider">{challenge.subject}</span>
            <div className="text-lg font-bold mt-1">{challenge.date}</div>
          </div>
          <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-mono font-bold">Expires in 14:22:05</span>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-xl font-medium text-gray-900 mb-6 leading-relaxed">
            {challenge.question}
          </h3>

          <div className="space-y-3">
            {challenge.options.map((opt) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ";
              
              if (!answered) {
                btnClass += "border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700";
              } else {
                if (opt.id === challenge.correctOption) {
                  btnClass += "border-green-500 bg-green-50 text-green-800 font-medium";
                } else if (opt.id === selectedOption) {
                  btnClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  btnClass += "border-gray-200 bg-gray-50 text-gray-400 opacity-50";
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt.id)}
                  disabled={answered}
                  className={btnClass}
                >
                  <span>{opt.text}</span>
                  {answered && opt.id === challenge.correctOption && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  {answered && opt.id === selectedOption && opt.id !== challenge.correctOption && <XCircle className="h-5 w-5 text-red-500" />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`p-4 rounded-xl mb-6 ${selectedOption === challenge.correctOption ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    {selectedOption === challenge.correctOption ? (
                      <Star className="h-6 w-6 text-green-500 fill-current" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                  <div>
                    <h4 className={`font-bold ${selectedOption === challenge.correctOption ? 'text-green-800' : 'text-red-800'}`}>
                      {selectedOption === challenge.correctOption ? `Awesome! You earned ${challenge.reward} points.` : 'Oops! That was incorrect.'}
                    </h4>
                    <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                      <span className="font-semibold">Explanation:</span> {challenge.explanation}
                    </p>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center">
                Back to Dashboard <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
