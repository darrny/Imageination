import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
  try {
    const { prompt, params } = await req.json();
    
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt. Please provide a text description.' }, 
        { status: 400 }
      );
    }

    const cleanPrompt = prompt.trim();
    
    try {
      const response = await Hf.textToImage({
        model: 'black-forest-labs/FLUX.1-dev',
        inputs: cleanPrompt,
        parameters: {
          height: params.height,
          width: params.width,
          guidance_scale: params.guidanceScale,
          num_inference_steps: params.numInferenceSteps,
        }
      });

      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      
      return NextResponse.json({ image: `data:image/jpeg;base64,${base64}` });
    } catch (error: any) {
      if (error.message?.includes('Max requests total reached')) {
        return NextResponse.json(
          { 
            error: 'Rate limit reached. Please wait a minute before generating another image.',
            isRateLimit: true 
          }, 
          { status: 429 }
        );
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: `Generation failed: ${error.message}` }, 
      { status: 500 }
    );
  }
}