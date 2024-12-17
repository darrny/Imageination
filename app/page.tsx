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
    <main className="min-h-screen bg-green-300 px-2 py-4 sm:p-4"> {/* Adjusted padding */}
      <div className="max-w-4xl mx-auto pt-4 sm:pt-8"> {/* Adjusted top padding */}
        <div className="flex items-center justify-center mb-12 space-x-3">
          <div className="p-3 bg-emerald-800 rounded-xl shadow-lg">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-emerald-800 tracking-tight">Imageination</h1>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 mb-8 transition-shadow hover:shadow-2xl">
          <form onSubmit={generateImage} className="space-y-4">
            {/* Change the flex container to column on mobile */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create..."
                className="flex-1 p-4 rounded-lg border-2 border-emerald-200 focus:outline-none focus:border-emerald-500 focus:ring-0 
                text-lg transition-colors text-gray-900 min-w-0"
                required
              />
              <button
                type="submit"
                disabled={loading || cooldown > 0}
                className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-emerald-300 
                transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:shadow-none
                transform hover:-translate-y-0.5 active:translate-y-0
                w-full sm:w-auto" // Added w-full on mobile, auto width on desktop
              >
                {loading ? 'Generating...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Generate'}
              </button>
            </div>

            <div className="text-sm text-emerald-600 mt-2 ml-1">
              Tip: May take up to 10 tries to generate an image, just keep retrying!
            </div>

            <AdvancedOptions params={params} onChange={setParams} />
          </form>

          {error && (
            <div className="mt-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-r-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Do not give up, we are almost done! Hit generate again!</span>
            </div>
          )}

          {loading && <DotGame />}

          {image && !loading && (
            <div className="mt-8 space-y-4">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={image}
                  alt="Generated image"
                  className="w-full"
                />
              </div>
              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 
                          transition-all duration-200 font-medium shadow-md hover:shadow-lg
                          transform hover:-translate-y-0.5 active:translate-y-0"
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