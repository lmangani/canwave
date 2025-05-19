import type React from "react"
/**
 * Configuration options for the waveform generator
 */
export interface WaveformOptions {
  /** Background color of the waveform (CSS color string) */
  backgroundColor?: string
  /** Color of the waveform bars (CSS color string) */
  waveColor?: string
  /** Width of each bar in pixels */
  barWidth?: number
  /** Gap between bars in pixels */
  gap?: number
  /** Minimum height of bars as percentage (0-100) */
  minHeight?: number
  /** Maximum height of bars as percentage (0-100) */
  maxHeight?: number
  /** Whether to mirror the waveform vertically */
  mirror?: boolean
  /** Whether to randomize bar heights */
  randomize?: boolean
  /** Custom array of heights (0-100) to use instead of random generation */
  customHeights?: number[]
}

/**
 * Default options for the waveform generator
 */
const defaultOptions: Required<WaveformOptions> = {
  backgroundColor: "#0f172a",
  waveColor: "rgba(255, 255, 255, 0.7)",
  barWidth: 3,
  gap: 4,
  minHeight: 5,
  maxHeight: 70,
  mirror: true,
  randomize: true,
  customHeights: [],
}

/**
 * Generates a waveform on a canvas element
 *
 * @param canvas - The canvas element to draw on
 * @param options - Configuration options for the waveform
 * @returns A function to regenerate the waveform with new random values
 */
export function generateWaveform(canvas: HTMLCanvasElement, options?: WaveformOptions): () => void {
  const opts = { ...defaultOptions, ...options }

  // Function to draw the waveform
  const draw = () => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions based on its display size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas with background color
    ctx.fillStyle = opts.backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate how many bars we can fit
    const totalWidth = opts.barWidth + opts.gap
    const barCount = Math.floor(canvas.width / totalWidth)

    // Generate heights if needed
    let heights: number[]

    if (opts.customHeights && opts.customHeights.length > 0) {
      // Use custom heights if provided
      heights = opts.customHeights

      // If we have fewer heights than bars, repeat the pattern
      if (heights.length < barCount) {
        const originalHeights = [...heights]
        while (heights.length < barCount) {
          heights = [...heights, ...originalHeights]
        }
      }

      // Trim if we have too many
      heights = heights.slice(0, barCount)
    } else {
      // Generate random heights
      heights = Array.from({ length: barCount }, () =>
        opts.randomize
          ? Math.floor(Math.random() * (opts.maxHeight - opts.minHeight)) + opts.minHeight
          : (opts.maxHeight + opts.minHeight) / 2,
      )
    }

    // Draw bars
    ctx.fillStyle = opts.waveColor

    for (let i = 0; i < barCount; i++) {
      // Calculate height in pixels (as percentage of half canvas height if mirrored)
      const heightPercent = heights[i]
      const pixelHeight = opts.mirror
        ? (canvas.height / 2) * (heightPercent / 100)
        : canvas.height * (heightPercent / 100)

      // Calculate x position
      const x = i * totalWidth

      if (opts.mirror) {
        // Draw bar from center (both up and down)
        const centerY = canvas.height / 2
        ctx.fillRect(x, centerY - pixelHeight, opts.barWidth, pixelHeight)
        ctx.fillRect(x, centerY, opts.barWidth, pixelHeight)
      } else {
        // Draw bar from bottom
        ctx.fillRect(x, canvas.height - pixelHeight, opts.barWidth, pixelHeight)
      }
    }
  }

  // Initial draw
  draw()

  // Return function to redraw with new random values
  return draw
}

/**
 * Creates a waveform canvas element and attaches it to a container
 *
 * @param container - The container element to attach the canvas to
 * @param options - Configuration options for the waveform
 * @returns An object with the canvas element and a regenerate function
 */
export function createWaveform(container: HTMLElement, options?: WaveformOptions) {
  // Create canvas element
  const canvas = document.createElement("canvas")
  canvas.className = "waveform-canvas"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.display = "block"

  // Append to container
  container.appendChild(canvas)

  // Generate waveform
  const regenerate = generateWaveform(canvas, options)

  return {
    canvas,
    regenerate,
  }
}

/**
 * React hook to use the waveform in a React component
 *
 * @param options - Configuration options for the waveform
 * @returns An object with the ref to attach to a canvas and a regenerate function
 */
export function useWaveform(options?: WaveformOptions) {
  // This is just a TypeScript type definition for the return value
  type WaveformHook = {
    canvasRef: React.RefObject<HTMLCanvasElement>
    regenerate: () => void
  }

  // This function will be properly implemented in the React hook file
  return {} as WaveformHook
}
