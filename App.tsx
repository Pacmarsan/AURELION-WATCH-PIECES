import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ThreeDLandingPage } from './components/ThreeDLandingPage';
import { Footer } from './components/Footer';
import { VerticalGallery } from './components/VerticalGallery';
import { Craft } from './components/Craft';
import { Contact } from './components/Contact';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'gallery' | 'craft' | 'contact'>('home');

  if (view === 'gallery') {
      return (
        <div className="relative min-h-screen bg-void text-white selection:bg-primary/30 selection:text-white">
            <VerticalGallery onNavigate={setView} />
        </div>
      );
  }

  return (
    <div className="relative min-h-screen bg-void text-white selection:bg-primary/30 selection:text-white">
      {/* Global Noise Overlay */}
      <div className="bg-noise fixed inset-0 z-40 pointer-events-none"></div>
      
      <Navbar onNavigate={setView} />
      
      <main>
        {view === 'home' && (
          <ThreeDLandingPage onNavigate={setView} />
        )}
        {view === 'craft' && (
          <Craft />
        )}
        {view === 'contact' && (
          <Contact />
        )}
      </main>
      
      {/* Footer logic: Home and Craft show normal footer. Contact has its own layout. */}
      {view === 'craft' && <Footer />}
    </div>
  );
};

export default App;