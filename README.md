# Anniversary Love Letter Website

An interactive, cinematic love letter website designed as a surprise anniversary gift.

## Features

- Cinematic black-themed design
- Interactive envelope opening animation
- Transition from old-fashioned scroll to modern experience
- Emotional letter presentation with section-by-section reveal
- Music integration (requires local audio file)
- Responsive design for mobile and desktop
- Reduced motion support
- Optimized for performance

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:
```bash
npm run dev
```

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

### Adding Music

To add the optional music track ("A Thousand Years" by Christina Perri):

1. Obtain a legal copy of the audio file (MP3 format recommended)
2. Place the file in `public/audio/a-thousand-years.mp3`
3. The music will automatically attempt to play when the user interacts with the envelope (first interaction)
   - Note: Modern browsers may block autoplay until user interaction, so the first tap/click will start the music if permitted
   - A music control button is available in the bottom-left corner to toggle playback

### Deployment to Vercel

1. Push the repository to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect the Vite configuration and build the project
4. Ensure the build command is `npm run build` and output directory is `dist`

## Design Notes

- The website follows a specific emotional journey: curious → interaction → nostalgia → surprise → intimacy → reflection → emotion → love → closure
- Black is the dominant color, with elegant accents
- No photographs or videos are used - the experience relies on typography, animation, and atmosphere
- The letter text is preserved exactly as provided, maintaining the author's voice and style
- Performance is optimized for mobile devices

## File Structure

```
src/
├─ components/   # Reusable UI components
├─ sections/     # Page sections (if needed)
├─ hooks/        # Custom React hooks
├─ assets/       # Static assets (images, etc.)
├─ App.jsx       # Main application component
└─ main.jsx      # Entry point

public/
├─ audio/        # For music files (add a-thousand-years.mp3 here)
└─ index.html    # HTML template
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Responsive down to 320px width

## Accessibility

- Semantic HTML
- Keyboard navigable
- Focus visible states
- Reduced motion support
- Adequate color contrast
- ARIA labels where needed

## Credits

Created as a personalized anniversary gift.