# Canvas Waveform Library

A lightweight, customizable library for generating audio waveform visualizations using HTML Canvas.

## Features

- Customizable colors, bar width, and spacing
- React hook and component for easy integration
- Vanilla JS functions for non-React projects
- TypeScript support with full type definitions
- Responsive design that adapts to container size

## Usage [Example](example.html)

```javascript
 // Example 1: Basic waveform in container
    const basicWaveform = SoundSkyWaveform.createWaveformInContainer({
      container: '#basic-waveform',
      backgroundColor: '#0f172a',
      waveColor: 'rgba(255, 255, 255, 0.7)'
    });
    
    document.getElementById('regenerate-basic').addEventListener('click', function() {
      basicWaveform.regenerate();
    });
    
    // Example 2: Customizable waveform
    const customWaveform = SoundSkyWaveform.createWaveformInContainer({
      container: '#custom-waveform',
      backgroundColor: '#0f172a',
      waveColor: 'rgba(255, 255, 255, 0.7)',
      barWidth: 2,
      gap: 3
    });
    
    document.getElementById('regenerate-custom').addEventListener('click', function() {
      customWaveform.regenerate();
    });
    
    document.getElementById('apply-colors').addEventListener('click', function() {
      const bgColor = document.getElementById('bg-color').value;
      const waveColor = document.getElementById('wave-color').value;
      
      customWaveform.updateOptions({
        backgroundColor: bgColor,
        waveColor: waveColor
      });
    });
    
    // Example 3: Using existing canvas
    const existingCanvas = document.getElementById('existing-canvas');
    const existingWaveform = SoundSkyWaveform.createWaveform({
      canvas: existingCanvas,
      backgroundColor: '#1e293b',
      waveColor: 'rgba(59, 130, 246, 0.7)',
      barWidth: 4,
      gap: 2
    });
    
    document.getElementById('regenerate-existing').addEventListener('click', function() {
      existingWaveform.regenerate();
    });
    
    // Example 4: Single waveform example
    console.log("SoundSkyWaveform loaded:", SoundSkyWaveform !== undefined);
    
    const waveform = SoundSkyWaveform.createWaveformInContainer({
      container: '#waveform',
      backgroundColor: '#0f172a',
      waveColor: 'rgba(255, 255, 255, 0.7)',
      barWidth: 3,
      gap: 4
    });
    
    document.getElementById('regenerate').addEventListener('click', function() {
      waveform.regenerate();
    });
```

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
