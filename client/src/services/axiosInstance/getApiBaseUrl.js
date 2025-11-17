// Helper to compute API base URL with sensible fallbacks
export function getApiBaseUrl() {
    // Prefer explicit env var (set at build time for CRA)
    const envUrl = typeof process !== 'undefined' ? process.env.REACT_APP_BACKEND_URL : undefined;
    if (envUrl && envUrl.trim()) {
        return envUrl.replace(/\/$/, '') + '/api';
    }

    // Runtime fallback: check for a global override injected at runtime
    if (typeof window !== 'undefined') {
        if (window.__BACKEND_URL__ && window.__BACKEND_URL__.trim()) {
            return window.__BACKEND_URL__.replace(/\/$/, '') + '/api';
        }

        // Last resort: assume backend is hosted on same origin under /api
        try {
            const origin = window.location && window.location.origin ? window.location.origin : '';
            if (origin) return origin.replace(/\/$/, '') + '/api';
        } catch (e) {
            // ignore
        }
    }

    // Final fallback for local development
    return 'http://localhost:4000/api';
}

export default getApiBaseUrl;
