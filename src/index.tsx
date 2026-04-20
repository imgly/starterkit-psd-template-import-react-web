/**
 * CE.SDK PSD Template Import Starterkit - React Entry Point
 *
 * Import and edit Adobe Photoshop (PSD) templates with professional
 * editing features powered by CE.SDK.
 *
 * @see https://img.ly/docs/cesdk/js/getting-started/
 */

import type { Configuration } from '@cesdk/cesdk-js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App';

// ============================================================================
// Configuration
// ============================================================================

const config: Configuration = {
  // Unique user identifier for analytics (customize for your app)
  userId: 'starterkit-psd-template-import-user'

  // Local assets (uncomment and set path for self-hosted assets)
  // baseURL: `/assets/`,

  // License key (required for production)
  // license: 'YOUR_LICENSE_KEY',
};

// ============================================================================
// Initialize React Application
// ============================================================================

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <App editorConfig={config} />
  </StrictMode>
);
