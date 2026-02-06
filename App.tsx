import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { Footer } from './components/Footer';
import { VerticalGallery } from './components/VerticalGallery';
import { ProductDetail } from './components/ProductDetail';
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
      <div className="bg-noise fixed inset-0 z-[60] pointer-events-none"></div>
      
      <Navbar onNavigate={setView} />
      
      <main>
        {view === 'home' && (
          <>
            <Hero onNavigate={setView} />
            <Collection />
          </>
        )}
        {view === 'craft' && (
          <Craft />
        )}
        {view === 'contact' && (
          <Contact />
        )}
      </main>
      
      {/* Footer logic: Home and Craft show normal footer. Contact has its own layout. */}
      {view === 'home' && <Footer />}
      {view === 'craft' && <Footer />}
    </div>
  );
};

export default App;