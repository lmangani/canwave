/**
 * SoundSky Waveform Generator
 * A lightweight canvas-based audio waveform visualization library
 *
 * @version 1.0.0
 */

/**
 * Creates a waveform visualization on a canvas element
 *
 * @param {Object} options - Configuration options
 * @param {HTMLCanvasElement|string} options.canvas - Canvas element or selector
 * @param {string} [options.backgroundColor="#0f172a"] - Background color
 * @param {string} [options.waveColor="rgba(255, 255, 255, 0.7)"] - Waveform color
 * @param {number} [options.barWidth=3] - Width of each bar in pixels
 * @param {number} [options.gap=4] - Gap between bars in pixels
 * @param {number} [options.minHeight=5] - Minimum height of bars (percentage)
 * @param {number} [options.maxHeight=70] - Maximum height of bars (percentage)
 * @param {boolean} [options.mirror=true] - Whether to mirror the waveform vertically
 * @param {boolean} [options.randomize=true] - Whether to randomize bar heights
 * @param {number[]} [options.customHeights=[]] - Custom array of heights (0-100)
 * @param {boolean} [options.responsive=true] - Whether to resize on window resize
 * @returns {Object} - Control methods for the waveform
 */
function createWaveform(options) {
  // Default options
  const defaults = {
    canvas: null,
    backgroundColor: "#0f172a",
    waveColor: "rgba(255, 255, 255, 0.7)",
    barWidth: 3,
    gap: 4,
    minHeight: 5,
    maxHeight: 70,
    mirror: true,
    randomize: true,
    customHeights: [],
    responsive: true,
  }

  // Merge options with defaults
  const config = Object.assign({}, defaults, options)

  // Get canvas element
  let canvas
  if (typeof config.canvas === "string") {
    canvas = document.querySelector(config.canvas)
    if (!canvas) {
      console.error(`Canvas element not found: ${config.canvas}`)
      return null
    }
  } else if (config.canvas instanceof HTMLCanvasElement) {
    canvas = config.canvas
  } else {
    console.error("Invalid canvas option. Provide a canvas element or selector.")
    return null
  }

  // Get canvas context
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    console.error("Could not get canvas context")
    return null
  }

  // Set initial canvas dimensions
  function setCanvasDimensions() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  setCanvasDimensions()

  // Function to draw the waveform
  function draw() {
    // Clear canvas with background color
    ctx.fillStyle = config.backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate how many bars we can fit
    const totalWidth = config.barWidth + config.gap
    const barCount = Math.floor(canvas.width / totalWidth)

    // Generate heights if needed
    let heights

    if (config.customHeights && config.customHeights.length > 0) {
      // Use custom heights if provided
      heights = config.customHeights

      // If we have fewer heights than bars, repeat the pattern
      if (heights.length < barCount) {
        const originalHeights = [...heights]
        while (heights.length < barCount) {
          heights = heights.concat(originalHeights)
        }
      }

      // Trim if we have too many
      heights = heights.slice(0, barCount)
    } else {
      // Generate random heights
      heights = Array(barCount)
        .fill(0)
        .map(() =>
          config.randomize
            ? Math.floor(Math.random() * (config.maxHeight - config.minHeight)) + config.minHeight
            : (config.maxHeight + config.minHeight) / 2,
        )
    }

    // Draw bars
    ctx.fillStyle = config.waveColor

    for (let i = 0; i < barCount; i++) {
      // Calculate height in pixels (as percentage of half canvas height if mirrored)
      const heightPercent = heights[i]
      const pixelHeight = config.mirror
        ? (canvas.height / 2) * (heightPercent / 100)
        : canvas.height * (heightPercent / 100)

      // Calculate x position
      const x = i * totalWidth

      if (config.mirror) {
        // Draw bar from center (both up and down)
        const centerY = canvas.height / 2
        ctx.fillRect(x, centerY - pixelHeight, config.barWidth, pixelHeight)
        ctx.fillRect(x, centerY, config.barWidth, pixelHeight)
      } else {
        // Draw bar from bottom
        ctx.fillRect(x, canvas.height - pixelHeight, config.barWidth, pixelHeight)
      }
    }
  }

  // Handle window resize
  let resizeTimeout
  function handleResize() {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      setCanvasDimensions()
      draw()
    }, 100)
  }

  // Add resize listener if responsive
  if (config.responsive) {
    window.addEventListener("resize", handleResize)
  }

  // Initial draw
  draw()

  // Return public API
  return {
    /**
     * Regenerate the waveform with new random values
     */
    regenerate: () => {
      draw()
    },

    /**
     * Update configuration options
     * @param {Object} newOptions - New configuration options
     */
    updateOptions: (newOptions) => {
      Object.assign(config, newOptions)
      draw()
    },

    /**
     * Get current configuration
     * @returns {Object} Current configuration
     */
    getOptions: () => Object.assign({}, config),

    /**
     * Clean up event listeners
     */
    destroy: () => {
      if (config.responsive) {
        window.removeEventListener("resize", handleResize)
      }
    },
  }
}

/**
 * Creates a waveform visualization and attaches it to a container
 *
 * @param {Object} options - Configuration options
 * @param {HTMLElement|string} options.container - Container element or selector
 * @param {number|string} [options.height="200px"] - Height of the canvas
 * @param {string} [options.backgroundColor="#0f172a"] - Background color
 * @param {string} [options.waveColor="rgba(255, 255, 255, 0.7)"] - Waveform color
 * @param {number} [options.barWidth=3] - Width of each bar in pixels
 * @param {number} [options.gap=4] - Gap between bars in pixels
 * @param {number} [options.minHeight=5] - Minimum height of bars (percentage)
 * @param {number} [options.maxHeight=70] - Maximum height of bars (percentage)
 * @param {boolean} [options.mirror=true] - Whether to mirror the waveform vertically
 * @param {boolean} [options.randomize=true] - Whether to randomize bar heights
 * @param {number[]} [options.customHeights=[]] - Custom array of heights (0-100)
 * @param {boolean} [options.responsive=true] - Whether to resize on window resize
 * @returns {Object} - Control methods for the waveform and the created canvas
 */
function createWaveformInContainer(options) {
  // Get container
  let container
  if (typeof options.container === "string") {
    container = document.querySelector(options.container)
    if (!container) {
      console.error(`Container element not found: ${options.container}`)
      return null
    }
  } else if (options.container instanceof HTMLElement) {
    container = options.container
  } else {
    console.error("Invalid container option. Provide a DOM element or selector.")
    return null
  }

  // Create canvas element
  const canvas = document.createElement("canvas")
  canvas.style.width = "100%"
  canvas.style.height = options.height || "200px"
  canvas.style.display = "block"

  // Append to container
  container.appendChild(canvas)

  // Create waveform
  const waveform = createWaveform({
    ...options,
    canvas: canvas,
  })

  // Return extended API
  return {
    ...waveform,
    canvas: canvas,
  }
}

// Export as global or module
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    createWaveform,
    createWaveformInContainer,
  }
} else {
  window.SoundSkyWaveform = {
    createWaveform,
    createWaveformInContainer,
  }
}
