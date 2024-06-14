
import React from 'react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
      <div className="App">
        <Header />

        <main className="container mx-auto my-8">
          <Contact />
        </main>

        <Footer />
      </div>
  );
}

export default App;




