//Training Data Manager optional to implement 



import React, { useState } from 'react';
import trainingData from '../lib/trainingData.json';

export const TrainingDataManager = () => {
  const [selectedRoom, setSelectedRoom] = useState('General');
  const [newQuestion, setNewQuestion] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [trainingSet, setTrainingSet] = useState(trainingData.trainingQuestions);

  const rooms = ['General', 'Tech Talk', 'Random', 'Gaming'];

  const addTrainingPair = () => {
    if (!newQuestion.trim() || !newResponse.trim()) return;

    const updatedTrainingSet = {
      ...trainingSet,
      [selectedRoom]: [
        ...(trainingSet[selectedRoom] || []),
        {
          question: newQuestion.trim(),
          response: newResponse.trim()
        }
      ]
    };

    setTrainingSet(updatedTrainingSet);
    setNewQuestion('');
    setNewResponse('');

    // Save to localStorage for persistence
    localStorage.setItem('chatTrainingData', JSON.stringify(updatedTrainingSet));
    console.log('Updated training data:', updatedTrainingSet);
  };

  const removeTrainingPair = (roomName, index) => {
    const updatedTrainingSet = {
      ...trainingSet,
      [roomName]: trainingSet[roomName].filter((_, i) => i !== index)
    };
    
    setTrainingSet(updatedTrainingSet);
    localStorage.setItem('chatTrainingData', JSON.stringify(updatedTrainingSet));
    console.log('Removed training pair from', roomName);
  };

  const exportTrainingData = () => {
    const dataToExport = {
      trainingQuestions: trainingSet,
      contextPrompts: trainingData.contextPrompts
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'trainingData.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importTrainingData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (importedData.trainingQuestions) {
          setTrainingSet(importedData.trainingQuestions);
          localStorage.setItem('chatTrainingData', JSON.stringify(importedData.trainingQuestions));
          alert('Training data imported successfully!');
        } else {
          alert('Invalid training data format!');
        }
      } catch (error) {
        alert('Error parsing JSON file!');
      }
    };
    reader.readAsText(file);
  };

  const resetToDefault = () => {
    if (confirm('Are you sure you want to reset to default training data? This will remove all custom additions.')) {
      setTrainingSet(trainingData.trainingQuestions);
      localStorage.removeItem('chatTrainingData');
    }
  };

  // Load saved training data on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('chatTrainingData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setTrainingSet(parsedData);
      } catch (error) {
        console.error('Error loading saved training data:', error);
      }
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          🤖 Training Data Manager
        </h2>
        <div className="flex gap-3">
          <label className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 cursor-pointer">
            Import JSON
            <input
              type="file"
              accept=".json"
              onChange={importTrainingData}
              className="hidden"
            />
          </label>
          <button
            onClick={exportTrainingData}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            📥 Export
          </button>
          <button
            onClick={resetToDefault}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg">
        {rooms.map(room => (
          <div key={room} className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {(trainingSet[room] || []).length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {room}
            </div>
          </div>
        ))}
        <div className="text-center p-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow">
          <div className="text-2xl font-bold">
            {Object.values(trainingSet).reduce((total, arr) => total + (arr || []).length, 0)}
          </div>
          <div className="text-xs">
            Total Pairs
          </div>
        </div>
      </div>

      {/* Add New Training Pair */}
      <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          ➕ Add New Training Pair
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              🏠 Room:
            </label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {rooms.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              ❓ Question/Trigger:
            </label>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter a question or phrase..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            💬 AI Response:
          </label>
          <textarea
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
            placeholder="Enter the AI's response (supports markdown)..."
            rows={4}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            💡 Tip: Use markdown formatting for rich responses!
          </div>
          <button
            onClick={addTrainingPair}
            disabled={!newQuestion.trim() || !newResponse.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-medium"
          >
            ✨ Add Training Pair
          </button>
        </div>
      </div>

      {/* Display Current Training Data */}
      <div className="space-y-6">
        {rooms.map(room => (
          <div key={room} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 px-6 py-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center justify-between">
                <span>
                  {room === 'General' && '💬'} 
                  {room === 'Tech Talk' && '💻'} 
                  {room === 'Random' && '🎲'} 
                  {room === 'Gaming' && '🎮'} 
                  {room} ({(trainingSet[room] || []).length} pairs)
                </span>
                <div className="text-sm bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                  {((trainingSet[room] || []).length / 20 * 100).toFixed(0)}% trained
                </div>
              </h3>
            </div>
            
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {(trainingSet[room] || []).length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No training data yet. Add some questions to get started! 🚀
                </div>
              ) : (
                (trainingSet[room] || []).map((pair, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-3">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-sm text-blue-600 dark:text-blue-400">❓ Question #{index + 1}:</strong>
                        <button
                          onClick={() => removeTrainingPair(room, index)}
                          className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900"
                          title="Remove this training pair"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        "{pair.question}"
                      </p>
                    </div>
                    <div>
                      <strong className="text-sm text-green-600 dark:text-green-400">💬 Response:</strong>
                      <p className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded mt-1">
                        {pair.response}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Training Tips */}
      <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-lg border-l-4 border-yellow-500">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
          💡 Training Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
          <li>• <strong>Be specific:</strong> Include variations of common questions</li>
          <li>• <strong>Stay on-brand:</strong> Match the room's personality (tech-focused, casual, etc.)</li>
          <li>• <strong>Use markdown:</strong> Format responses with **bold**, *italic*, and lists</li>
          <li>• <strong>Test regularly:</strong> Try your questions in the actual chat</li>
          <li>• <strong>Export backups:</strong> Save your training data regularly</li>
        </ul>
      </div>
    </div>
  );
};