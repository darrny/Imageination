# Imageination 📸

Imageination is a web application that generates images from text descriptions using the FLUX.1-dev AI model. Built with Next.js and hosted on Vercel, it provides a simple and intuitive interface for AI image generation.

## Features ✨

- Text-to-image generation using FLUX.1-dev model
- Advanced parameter controls for image generation:
  - Adjustable image dimensions (512px-1024px)
  - Guidance scale control for prompt adherence
  - Inference steps adjustment for quality control
- Real-time image generation with loading indication
- Interactive mini-game while waiting for generation
- One-click image download functionality
- Clean, responsive user interface
- Rate limit handling with cooldown timer

## Getting Started 🚀

- Simply visit the [website](https://imageination.netlify.app) and explore!

## Usage

1. Enter a text description in the input field
2. (Optional) Adjust advanced parameters:
   - Image width and height
   - Guidance scale
   - Number of inference steps
3. Click "Generate" to create your image
4. Download the generated image using the download button

## Technical Stack 🛠️

- **Frontend Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: FLUX.1-dev via Hugging Face API
- **Hosting**: Vercel
- **Package Manager**: pnpm

## Rate Limits 

The application uses the Hugging Face free API, which has the following limitations:
- Maximum of 3 image generations per minute
- Automatic cooldown timer when rate limit is reached

## Deployment

The application is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Add your `HUGGINGFACE_API_KEY` to the environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.