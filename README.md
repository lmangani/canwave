# Canvas Waveform Library

A lightweight, customizable library for generating audio waveform visualizations using HTML Canvas.

## Features

- Customizable colors, bar width, and spacing
- React hook and component for easy integration
- Vanilla JS functions for non-React projects
- TypeScript support with full type definitions
- Responsive design that adapts to container size

## Usage

### React Component

\`\`\`jsx
import { Waveform } from "@/components/waveform";

function MyComponent() {
  return (
    <Waveform 
      height={200}
      options={{
        backgroundColor: "#0f172a",
        waveColor: "rgba(255, 255, 255, 0.7)",
        barWidth: 3,
        gap: 4
      }}
      showControls
    />
  );
}
\`\`\`

### React Hook

\`\`\`jsx
import { useWaveform } from "@/hooks/use-waveform";

function MyCustomWaveform() {
  const { canvasRef, regenerate } = useWaveform({
    backgroundColor: "#1e293b",
    waveColor: "#3b82f6"
  });
  
  return (
    <div>
      <div className="h-[200px] rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <button onClick={regenerate}>New Pattern</button>
    </div>
  );
}
\`\`\`

### Vanilla JavaScript

\`\`\`js
import { generateWaveform, createWaveform } from "@/lib/waveform";

// Option 1: Use with existing canvas
const canvas = document.getElementById("my-canvas");
const regenerate = generateWaveform(canvas, {
  backgroundColor: "#0f172a",
  waveColor: "rgba(255, 255, 255, 0.7)"
});

// Regenerate with new random pattern
regenerate();

// Option 2: Create new canvas in container
const container = document.getElementById("waveform-container");
const { canvas, regenerate } = createWaveform(container, {
  backgroundColor: "#1e293b",
  waveColor: "#3b82f6"
});
\`\`\`

## API Reference

### WaveformOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| backgroundColor | string | "#0f172a" | Background color of the canvas |
| waveColor | string | "rgba(255, 255, 255, 0.7)" | Color of the waveform bars |
| barWidth | number | 3 | Width of each bar in pixels |
| gap | number | 4 | Gap between bars in pixels |
| minHeight | number | 5 | Minimum height of bars (percentage) |
| maxHeight | number | 70 | Maximum height of bars (percentage) |
| mirror | boolean | true | Whether to mirror the waveform vertically |
| randomize | boolean | true | Whether to randomize bar heights |
| customHeights | number[] | [] | Custom array of heights to use instead of random generation |
