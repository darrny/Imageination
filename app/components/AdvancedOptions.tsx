import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ImageGenerationParams {
  width: number;
  height: number;
  guidanceScale: number;
  numInferenceSteps: number;
}

interface AdvancedOptionsProps {
  params: ImageGenerationParams;
  onChange: (params: ImageGenerationParams) => void;
}

export default function AdvancedOptions({ params, onChange }: AdvancedOptionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateParam = (key: keyof ImageGenerationParams, value: number) => {
    onChange({ ...params, [key]: value });
  };

  return (
    <div className="mt-4 bg-white rounded-lg border-2 border-emerald-100 transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
      >
        <span className="font-medium">Advanced Options</span>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {isExpanded && (
        <div className="p-4 space-y-6 border-t-2 border-emerald-100">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width: {params.width}px
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="512"
                  max="1024"
                  step="64"
                  value={params.width}
                  onChange={(e) => updateParam('width', Number(e.target.value))}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="absolute -bottom-6 left-0 text-xs text-emerald-600">512px</div>
                <div className="absolute -bottom-6 right-0 text-xs text-emerald-600">1024px</div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height: {params.height}px
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="512"
                  max="1024"
                  step="64"
                  value={params.height}
                  onChange={(e) => updateParam('height', Number(e.target.value))}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="absolute -bottom-6 left-0 text-xs text-emerald-600">512px</div>
                <div className="absolute -bottom-6 right-0 text-xs text-emerald-600">1024px</div>
              </div>
            </div>
          </div>

          <div className="space-y-8 mt-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Guidance Scale
                </label>
                <span className="text-sm text-emerald-600 font-medium">{params.guidanceScale}</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={params.guidanceScale}
                onChange={(e) => updateParam('guidanceScale', Number(e.target.value))}
                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <p className="text-xs text-emerald-600 mt-2">
                Higher values make the image more closely match the prompt
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Inference Steps
                </label>
                <span className="text-sm text-emerald-600 font-medium">{params.numInferenceSteps}</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="1"
                value={params.numInferenceSteps}
                onChange={(e) => updateParam('numInferenceSteps', Number(e.target.value))}
                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <p className="text-xs text-emerald-600 mt-2">
                More steps generally result in higher quality but take longer
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}