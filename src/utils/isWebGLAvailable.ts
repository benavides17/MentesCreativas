export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");

    // Try WebGL2 first, then WebGL, then experimental-webgl
    const contexts = ["webgl2", "webgl", "experimental-webgl"];
    for (const name of contexts) {
      try {
        const ctx = (canvas as any).getContext ? (canvas as any).getContext(name) : null;
        if (ctx) return true;
      } catch (e) {
        // ignore and try next
      }
    }

    return false;
  } catch (e) {
    // log for easier debugging, but don't throw
    // eslint-disable-next-line no-console
    console.warn("isWebGLAvailable detection failed:", e);
    return false;
  }
}
