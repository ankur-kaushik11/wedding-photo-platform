/**
 * Performance monitoring utilities
 */

class PerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.fpsHistory = [];
  }

  measureFPS() {
    this.frameCount++;
    const currentTime = performance.now();
    const delta = currentTime - this.lastFrameTime;

    if (delta >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / delta);
      this.fpsHistory.push(this.fps);
      
      // Keep only last 10 measurements
      if (this.fpsHistory.length > 10) {
        this.fpsHistory.shift();
      }

      this.frameCount = 0;
      this.lastFrameTime = currentTime;
    }

    return this.fps;
  }

  getAverageFPS() {
    if (this.fpsHistory.length === 0) return 60;
    const sum = this.fpsHistory.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.fpsHistory.length);
  }

  isPerformanceLow() {
    return this.getAverageFPS() < 30;
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Request animation frame with FPS tracking
export const requestAnimationFrameWithTracking = (callback) => {
  return requestAnimationFrame(() => {
    performanceMonitor.measureFPS();
    callback();
  });
};
