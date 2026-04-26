import Navbar from './components/Navbar/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import ClickSpark from './components/ClickSpark/ClickSpark';
import './App.css';

function App() {
  return (
    <ClickSpark
      sparkColor="#6b38fb"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </ClickSpark>
  );
}

export default App;
