import '../styles/globals.css';
import ThemeToggle from '../components/ThemeToggle';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Add script to prevent flash of unstyled content in dark mode
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (typeof window !== 'undefined') {
      const darkModeScript = document.createElement('script');
      darkModeScript.innerHTML = `
        if (localStorage.getItem('darkMode') === 'true' || 
            (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('darkMode', 'true');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('darkMode', 'false');
        }
      `;
      darkModeScript.id = 'dark-mode-script';
      
      // Only add the script if it doesn't already exist
      if (!document.getElementById('dark-mode-script')) {
        document.head.appendChild(darkModeScript);
      }
    }
  }, []);

  return (
    <>
      <ThemeToggle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;