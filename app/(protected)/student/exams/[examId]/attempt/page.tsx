'use client';

import { useState, useEffect, use, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, ChevronLeft, ChevronRight, Flag, Grid, AlertTriangle, CheckCircle, XCircle, Calculator, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Exam Data
const EXAM_DATA = {
  id: 'mock-1',
  title: 'UKSSSC Full Length Mock Test 1',
  duration: 120 * 60, // seconds
  sections: ['General Knowledge', 'General Hindi', 'Uttarakhand GK'],
  questions: Array.from({ length: 100 }).map((_, i) => ({
    id: i + 1,
    section: i < 40 ? 'General Knowledge' : i < 70 ? 'General Hindi' : 'Uttarakhand GK',
    text: `Question ${i + 1}: This is a placeholder question text for ${i < 40 ? 'General Knowledge' : i < 70 ? 'General Hindi' : 'Uttarakhand GK'}.`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correct: 0,
  })),
};

export default function ExamAttemptPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = use(params);
  const router = useRouter();
  
  const [currentSection, setCurrentSection] = useState(EXAM_DATA.sections[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [visited, setVisited] = useState<number[]>([1]); // Track visited questions
  const [timeLeft, setTimeLeft] = useState(EXAM_DATA.duration);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Filter questions by section
  const sectionQuestions = EXAM_DATA.questions.filter(q => q.section === currentSection);
  const currentQuestion = EXAM_DATA.questions[currentQuestionIndex];

  // Handle Section Change
  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    // Find first question of the new section
    const firstQuestionOfSection = EXAM_DATA.questions.find(q => q.section === section);
    if (firstQuestionOfSection) {
      const index = EXAM_DATA.questions.findIndex(q => q.id === firstQuestionOfSection.id);
      setCurrentQuestionIndex(index);
      if (!visited.includes(firstQuestionOfSection.id)) {
        setVisited(prev => [...prev, firstQuestionOfSection.id]);
      }
    }
  };

  const handleQuestionChange = (index: number) => {
    setCurrentQuestionIndex(index);
    const qId = EXAM_DATA.questions[index].id;
    if (!visited.includes(qId)) {
      setVisited(prev => [...prev, qId]);
    }
    // Update section if jumping to a question in a different section
    const newSection = EXAM_DATA.questions[index].section;
    if (newSection !== currentSection) {
      setCurrentSection(newSection);
    }
  };

  const handleSubmit = useCallback(() => {
    // Submit logic here
    // In a real app, you would send the answers to the backend
    router.push(`/student/exams/${examId}/result`);
  }, [router, examId]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionIndex });
  };

  const toggleMarkForReview = () => {
    const qId = currentQuestion.id;
    if (markedForReview.includes(qId)) {
      setMarkedForReview(markedForReview.filter((id) => id !== qId));
    } else {
      setMarkedForReview([...markedForReview, qId]);
    }
  };

  const isAnswered = answers[currentQuestion.id] !== undefined;
  const isMarked = markedForReview.includes(currentQuestion.id);

  // Calculate Stats for Modal
  const stats = {
    answered: Object.keys(answers).length,
    marked: markedForReview.length,
    notAnswered: EXAM_DATA.questions.length - Object.keys(answers).length,
    notVisited: EXAM_DATA.questions.length - visited.length,
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm z-10">
        <h1 className="text-lg font-bold text-gray-900 truncate max-w-md">{EXAM_DATA.title}</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-red-700 font-mono font-bold">
            <Clock className="h-5 w-5" />
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => setShowSubmitModal(true)}
            className="rounded-lg bg-green-600 px-6 py-2 text-sm font-bold text-white hover:bg-green-700 shadow-sm transition-colors"
          >
            Submit Exam
          </button>
        </div>
      </header>

      {/* Section Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex gap-2 overflow-x-auto">
        {EXAM_DATA.sections.map((section) => (
          <button
            key={section}
            onClick={() => handleSectionChange(section)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              currentSection === section
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Question Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">
                  Question {currentQuestionIndex + 1} of {EXAM_DATA.questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+1.0</span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">-0.25</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 ease-out" 
                  style={{ width: `${((currentQuestionIndex + 1) / EXAM_DATA.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
              <p className="text-lg font-medium text-gray-900 leading-relaxed flex-1">
                {currentQuestion.text}
              </p>

              <div className="mt-8 space-y-4">
                {currentQuestion.options.map((option, idx) => (
                  <label 
                    key={idx}
                    className={`flex cursor-pointer items-center rounded-xl border p-4 transition-all ${
                      answers[currentQuestion.id] === idx 
                        ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                        : 'border-gray-200 hover:bg-gray-50 hover:border-blue-300'
                    }`}
                    onClick={() => handleAnswer(idx)}
                  >
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      answers[currentQuestion.id] === idx
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300 bg-white'
                    }`}>
                      {answers[currentQuestion.id] === idx && (
                        <div className="h-2.5 w-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="ml-4 text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex gap-3">
                <button 
                  onClick={toggleMarkForReview}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    isMarked 
                      ? 'border-red-500 bg-red-50 text-red-700' 
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Flag className="h-4 w-4" />
                  {isMarked ? 'Unmark' : 'Mark for Review'}
                </button>
                <button 
                  onClick={() => {
                    const newAnswers = { ...answers };
                    delete newAnswers[currentQuestion.id];
                    setAnswers(newAnswers);
                  }}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear Response
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleQuestionChange(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <button
                  onClick={() => handleQuestionChange(Math.min(EXAM_DATA.questions.length - 1, currentQuestionIndex + 1))}
                  disabled={currentQuestionIndex === EXAM_DATA.questions.length - 1}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all hover:shadow-md"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Question Palette Sidebar */}
        <aside className={`w-80 flex-col border-l border-gray-200 bg-white transition-all ${isSidebarOpen ? 'flex' : 'hidden'}`}>
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 bg-gray-50">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Grid className="h-4 w-4" /> Question Palette
            </h3>
          </div>
          
          <div className="p-4 border-b border-gray-200 bg-gray-50">
             <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-green-500" /> <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-red-500" /> <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-gray-200 border border-gray-300" /> <span>Not Visited</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="h-3 w-3 rounded bg-white border border-gray-300" /> <span>Visited</span>
                </div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-2">
              {EXAM_DATA.questions.map((q, idx) => {
                const isAns = answers[q.id] !== undefined;
                const isRev = markedForReview.includes(q.id);
                const isVis = visited.includes(q.id);
                const isCurr = currentQuestionIndex === idx;
                
                // Color Logic based on requirements:
                // Green = Answered
                // Red = Marked for Review
                // Gray = Not Visited
                // White = Visited (but not answered/marked)
                
                let bgClass = 'bg-gray-200 text-gray-600 border-gray-300'; // Default: Not Visited
                
                if (isVis) bgClass = 'bg-white text-gray-800 border-gray-300'; // Visited
                if (isRev) bgClass = 'bg-red-500 text-white border-red-600'; // Marked
                if (isAns) bgClass = 'bg-green-500 text-white border-green-600'; // Answered (Overrides Marked usually, or maybe Marked+Answered needs specific handling. Let's assume Answered takes precedence or Marked takes precedence. Prompt said Red=Marked. Let's stick to simple priority: Answered > Marked > Visited > Not Visited)
                
                // Wait, if I mark for review AND answer, it usually shows a specific icon or color (like purple with green dot). 
                // But adhering to the prompt "green=answered, red=marked". 
                // If answered, it's green. If marked and NOT answered, it's red.
                if (isRev && !isAns) bgClass = 'bg-red-500 text-white border-red-600';
                
                if (isCurr) bgClass += ' ring-2 ring-blue-500 ring-offset-2';

                return (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionChange(idx)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-bold transition-all ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Submit Exam?</h3>
                <button onClick={() => setShowSubmitModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="rounded-xl bg-green-50 p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">{stats.answered}</p>
                  <p className="text-sm font-medium text-green-800">Answered</p>
                </div>
                <div className="rounded-xl bg-red-50 p-4 text-center">
                  <p className="text-3xl font-bold text-red-600">{stats.marked}</p>
                  <p className="text-sm font-medium text-red-800">Marked for Review</p>
                </div>
                <div className="rounded-xl bg-gray-100 p-4 text-center">
                  <p className="text-3xl font-bold text-gray-700">{stats.notAnswered}</p>
                  <p className="text-sm font-medium text-gray-600">Not Answered</p>
                </div>
                <div className="rounded-xl bg-gray-100 p-4 text-center">
                  <p className="text-3xl font-bold text-gray-700">{stats.notVisited}</p>
                  <p className="text-sm font-medium text-gray-600">Not Visited</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Resume Exam
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 shadow-md"
                >
                  Confirm Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

