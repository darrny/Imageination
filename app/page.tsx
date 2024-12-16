"use client"

import { useState, useEffect } from 'react';
import { Camera, AlertCircle } from 'lucide-react';
import AdvancedOptions from './components/AdvancedOptions';
import DotGame from './components/DotGame';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [params, setParams] = useState({
    width: 1024,
    height: 1024,
    guidanceScale: 3.5,
    numInferenceSteps: 50
  });

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown(cooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) {
      setError(`Please wait ${cooldown} seconds before generating another image`);
      return;
    }

    setLoading(true);
    setError('');
    setImage('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, params })
      });
      
      const data = await response.json();
      
      if (response.status === 429) {
        setCooldown(60);
        throw new Error(data.error);
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setImage(data.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex items-center justify-center mb-12 space-x-3">
          <Camera className="w-10 h-10 text-green-600" />
          <h1 className="text-4xl font-bold text-green-600 tracking-tight">Imageination</h1>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <form onSubmit={generateImage} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Try something like: 'A detailed pencil sketch of a mountain landscape'"
                className="flex-1 p-4 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                required
              />
              <button
                type="submit"
                disabled={loading || cooldown > 0}
                className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-colors font-semibold text-lg shadow-md hover:shadow-lg disabled:shadow-none"
              >
                {loading ? 'Generating...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Generate'}
              </button>
            </div>
            
            <AdvancedOptions params={params} onChange={setParams} />
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {loading && <DotGame />}

          {image && !loading && (
            <div className="mt-8 space-y-4">
              <img 
                src={image} 
                alt="Generated image"
                className="w-full rounded-lg shadow-xl"
              />
              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium shadow-md"
              >
                Download Image
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}