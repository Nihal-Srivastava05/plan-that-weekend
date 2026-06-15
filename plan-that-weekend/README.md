# Plan That Weekend

> Maximize your vacation time by discovering long weekends and getting smart suggestions

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

✨ **Smart Holiday Planning**
- Find all long weekends (3+ days) automatically
- Get ranked suggestions for optimal days to take off
- Maximize vacation benefit with minimal days off

🗓️ **Multiple Input Methods**
- Quick load from country presets (US, India, UK)
- Import holidays via CSV file
- Manually add individual dates

📊 **Visual Dashboard**
- Color-coded calendar highlighting
- Statistics overview (longest streak, total days off)
- Ranked suggestions with benefit scores

🎨 **Modern UI/UX**
- Clean, minimalistic design
- Dark mode support
- Smooth animations (Framer Motion)
- Fully responsive (mobile, tablet, desktop)

💾 **Data Persistence**
- localStorage with Zod validation
- Year-based holiday organization
- Export/import functionality

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, custom design system
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Validation**: Zod
- **Date Handling**: date-fns
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd plan-that-weekend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:coverage # Run tests with coverage
npm run lint         # Lint code
```

## Usage

1. **Select Year**: Choose the year you want to plan (2024-2030)
2. **Add Holidays**: 
   - Use country presets for quick setup
   - Upload a CSV file with holidays
   - Manually add individual dates
3. **View Results**:
   - See all long weekends highlighted on calendar
   - Check statistics dashboard
   - Review ranked suggestions
4. **Optimize**: Add suggested holidays to maximize vacation time

## Algorithm

### Long Weekend Detection
- Merges holidays with regular weekends (Saturday/Sunday)
- Identifies consecutive day streaks of 3+ days
- Marks weekends that include user holidays

### Smart Suggestions
- Configurable gap detection (default: 1-3 days)
- Calculates benefit score: `total_days_gained / days_off_required`
- Ranks suggestions by benefit score and efficiency
- Shows resulting weekend duration for each suggestion

## Testing

The project includes comprehensive unit tests for core algorithms:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

Test coverage targets:
- Algorithms: 95%+
- Components: 80%+

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect your repository to Vercel for automatic deployments.

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

**Performance Targets:**
- Bundle size: < 200KB gzipped
- Lighthouse score: 95+
- First Contentful Paint: < 1.5s

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Card, Modal, etc.)
│   ├── layout/          # Layout components (Header)
│   ├── features/        # Feature-specific components
│   │   ├── calendar/    # Calendar components
│   │   ├── holidays/    # Holiday management
│   │   └── suggestions/ # Suggestion components
│   └── shared/          # Shared components (YearSelector, etc.)
├── hooks/               # Custom React hooks
├── lib/
│   ├── algorithms/      # Core algorithms (findLongWeekends, suggestHolidays)
│   ├── data/           # Static data (country holidays)
│   ├── storage/        # localStorage adapter
│   └── validation/     # Zod schemas
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── theme/              # Design system tokens

```

## Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions  
- Safari: Last 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android 90+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Holiday data sourced from official government calendars
- Icons from Heroicons
- Design inspired by modern calendar applications

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
