import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, TrendingDown, Factory, Home, Server, Tractor,
  Stethoscope, ShieldAlert, CheckCircle2, XCircle, ChevronDown,
  BatteryCharging, Smartphone, Activity, ArrowRight, Menu, X, Check, Phone, Zap, Sun, Moon, Play, Leaf
} from 'lucide-react';

// --- Custom Hooks & Components for Animation ---

const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isIntersecting];
};

const FadeIn = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const getDirectionClasses = () => {
    switch(direction) {
      case 'up': return 'translate-y-10';
      case 'down': return '-translate-y-10';
      case 'left': return 'translate-x-10';
      case 'right': return '-translate-x-10';
      default: return 'translate-y-10';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${getDirectionClasses()}`} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Base Components ---

const Button = ({ children, variant = 'primary', className = '', href, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 active:scale-95";
  const variants = {
    primary: "bg-[#00FF00] hover:bg-[#00DD00] text-black shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:shadow-[0_0_25px_rgba(0,255,0,0.5)]",
    secondary: "bg-[#111111] hover:bg-black text-white shadow-md border border-[#333333]",
    outline: "border-2 border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00]/10"
  };

  if (href) {
    return (
      <a href={href} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Section = ({ children, className = '', id = '' }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full overflow-hidden ${className}`}>
    {children}
  </section>
);

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSpecTab, setActiveSpecTab] = useState('single');
  const [openFaq, setOpenFaq] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // For battery animation
  const [batteryRef, batteryInView] = useIntersectionObserver({ threshold: 0.5 });
  const [batteryWidth, setBatteryWidth] = useState(0);

  useEffect(() => {
    if (batteryInView) {
      setTimeout(() => setBatteryWidth(98), 300);
    }
  }, [batteryInView]);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? -1 : index);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const Logo = () => (
    <div className="flex items-center gap-2 group cursor-pointer">
      <Leaf className="w-6 h-6 text-[#00FF00] fill-[#00FF00] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
      <span className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
        Vetren<span className="text-[#00FF00] font-semibold drop-shadow-[0_0_8px_rgba(0,255,0,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(0,255,0,0.6)] transition-all">Energy</span>
      </span>
    </div>
  );

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-20px) rotate(4deg); }
          100% { transform: translateY(0px) rotate(3deg); }
        }
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-marquee {
          animation: scrollMarquee 30s linear infinite;
        }
        .hover-pause:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans selection:bg-[#00FF00]/30 selection:text-white dark:selection:bg-[#00FF00]/20 dark:selection:text-[#00FF00] transition-colors duration-500">

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-neutral-200 dark:border-[#222222] transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-24 flex items-center justify-between">
            <a href="#"><Logo /></a>
            <div className="hidden md:flex items-center gap-8 font-medium text-sm text-neutral-600 dark:text-neutral-400">
              <a href="#solutions" className="hover:text-[#00FF00] hover:-translate-y-0.5 transition-all duration-300">Solutions</a>
              <a href="#features" className="hover:text-[#00FF00] hover:-translate-y-0.5 transition-all duration-300">Features</a>
              <a href="#specs" className="hover:text-[#00FF00] hover:-translate-y-0.5 transition-all duration-300">Specs</a>
              <a href="#case-studies" className="hover:text-[#00FF00] hover:-translate-y-0.5 transition-all duration-300">Case Studies</a>
              <a href="#contact" className="hover:text-[#00FF00] hover:-translate-y-0.5 transition-all duration-300">Contact</a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-[#111111] text-neutral-600 dark:text-neutral-400 transition-all duration-300 hover:rotate-12">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Button variant="primary" className="py-2 px-5 text-sm">Call Us Now</Button>
            </div>
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-[#111111] text-neutral-600 dark:text-neutral-400 transition-colors">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="text-neutral-900 dark:text-white transition-transform active:scale-90" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl pt-32 px-6 flex flex-col gap-6 md:hidden transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <a href="#solutions" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-neutral-900 dark:text-white">Solutions</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-neutral-900 dark:text-white">Features</a>
            <a href="#specs" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-neutral-900 dark:text-white">Specs</a>
            <a href="#case-studies" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-neutral-900 dark:text-white">Case Studies</a>
            <Button variant="primary" className="mt-4">Call Us Now</Button>
        </div>

        {/* Hero Section */}
        <section className="relative pt-44 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
          <div className="flex-1 relative z-10">
            <FadeIn delay={100} direction="right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF00]/10 border border-[#00FF00]/30 text-[#00FF00] text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF00]"></span>
                </span>
                Meet the Energy Cube
              </div>
            </FadeIn>
            <FadeIn delay={200} direction="right">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-neutral-900 dark:text-white leading-tight mb-6 tracking-tight">
                Power Your <br/>
                <span className="text-[#00FF00]">Business Anywhere.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={300} direction="right">
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl leading-relaxed font-medium">
                The future of off-grid & backup energy solutions. Engineered for continuous operation—eliminating downtime, reducing costs, and enhancing security.
              </p>
            </FadeIn>
            <FadeIn delay={400} direction="up">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <Button variant="primary" className="w-full sm:w-auto text-black group">
                    Call us now <Phone className="ml-2 w-4 h-4 transition-transform group-hover:rotate-12" />
                  </Button>
                  <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">(44) 1743-612067</span>
                </div>
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto group"
                    href="https://drive.google.com/file/d/1H-_g6GGTZLkewdVHEJl3dVwbaLC_ftnU/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Info <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">info@vetrenenergy.co.uk</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="flex-1 relative z-10 w-full flex justify-center lg:justify-end">
            <FadeIn delay={200} direction="left" className="w-full flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 md:w-96 md:h-96 animate-float">
                <div className="absolute inset-0 bg-neutral-200 dark:bg-[#111111] rounded-3xl flex items-center justify-center shadow-2xl border border-neutral-300 dark:border-[#222222]">
                  <div className="w-[85%] h-[75%] bg-[#0a0a0a] rounded-lg border border-[#333] relative overflow-hidden flex flex-col z-10">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 border-2 border-neutral-700 rounded-sm"></div>
                    <div className="flex-1 flex flex-col items-center justify-center transform -rotate-90 origin-center translate-x-12">
                      <div className="flex items-center gap-2 mb-1">
                        <Leaf className="w-5 h-5 text-[#00FF00] fill-[#00FF00]" />
                        <span className="text-white font-bold text-lg tracking-wide">Vetren Energy</span>
                      </div>
                      <div className="text-neutral-300 font-semibold text-xl tracking-widest text-center mt-1">ENERGY CUBE</div>
                    </div>
                    <div className="absolute bottom-6 left-6 grid grid-cols-2 gap-1">
                      {[...Array(8)].map((_, i) => <div key={i} className="w-10 h-1 bg-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]"></div>)}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Video Placeholders */}
        <div className="bg-white dark:bg-black border-b border-neutral-200 dark:border-[#222222] transition-colors duration-500 w-full">
          <Section id="videos" className="py-12">
            <FadeIn><div className="text-center mb-8"><h2 className="text-2xl font-bold text-neutral-900 dark:text-white">See the Energy Cube in Action</h2></div></FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
          { title: 'Feature Video 1', video: '/feature-video-1.mp4' },                { title: 'Feature Video 2', video: '/feature-video-2.mp4' },
          { title: 'Feature Video 2', video: '/feature-video-2.mp4' },
              { title: 'Feature Video 3', video: '/feature-video-3.mp4' }].map((item, idx) => (
                <FadeIn key={idx} delay={idx * 150}>
                  <div className="aspect-video bg-neutral-100 dark:bg-[#111111] rounded-2xl flex items-center justify-center relative group overflow-hidden border border-neutral-200 dark:border-[#222222] shadow-sm transition-all hover:-translate-y-2 cursor-pointer hover:border-[#00FF00]/50">
                                    <video 
                  src={item.video} 
                  className="absolute inset-0 w-full h-full object-cover" 
                  controls
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23111' width='100' height='100'/%3E%3C/svg%3E"
                /></div>
                    <div className="absolute bottom-4 left-4 right-4 z-10"><span className="bg-white/90 dark:bg-black/90 text-neutral-900 dark:text-white px-3 py-1.5 rounded-lg text-xs font-bold border dark:border-[#333]">{item.title}</span></div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Section>
        </div>

        {/* Features Bento */}
        <Section id="features">
          <FadeIn><h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-12">Engineered for Absolute Reliability</h2></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FadeIn delay={100} className="lg:col-span-2">
              <div className="bg-neutral-900 dark:bg-[#111111] border dark:border-[#222222] hover:border-[#00FF00]/50 p-8 rounded-2xl flex flex-col justify-end min-h-[250px] relative overflow-hidden group transition-all duration-300">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('/reliability-1.jpg')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div className="relative z-10"><div className="flex items-center gap-2 mb-2"><BatteryCharging className="text-[#00FF00] w-6 h-6" /><h3 className="text-2xl font-bold text-white">24/7 Reliable Energy</h3></div><p className="text-neutral-300 text-sm font-medium max-w-md">Unwavering power for critical systems, grid-tied or off-grid.</p></div>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="bg-neutral-900 dark:bg-[#111111] border dark:border-[#222222] hover:border-[#00FF00]/50 p-8 rounded-2xl flex flex-col justify-end min-h-[250px] relative overflow-hidden group transition-all duration-300">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('/reliability-2.jpg')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div className="relative z-10"><div className="flex items-center gap-2 mb-2"><TrendingDown className="text-[#00FF00] w-6 h-6" /><h3 className="text-xl font-bold text-white">Savings</h3></div><p className="text-neutral-300 text-sm font-medium">Reduces energy bills and optimizes consumption.</p></div>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="bg-neutral-900 dark:bg-[#111111] border dark:border-[#222222] hover:border-[#00FF00]/50 p-8 rounded-2xl flex flex-col justify-end min-h-[250px] relative overflow-hidden group transition-all duration-300">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('/reliability-3.jpg')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div className="relative z-10"><div className="flex items-center gap-2 mb-2"><Zap className="text-[#00FF00] w-6 h-6" /><h3 className="text-xl font-bold text-white">Setup</h3></div><p className="text-neutral-300 text-sm font-medium">Built in-house and deployed within minutes.</p></div>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* Live System & Placements */}
        <Section>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <FadeIn direction="right">
                <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">Energy Cube <span className="text-neutral-400 font-medium">vs.</span> Standard Solar</h2>
                <div className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-[#222222] rounded-2xl overflow-hidden shadow-sm">
                  <div className="grid grid-cols-3 bg-neutral-50 dark:bg-[#0a0a0a] border-b border-neutral-200 dark:border-[#222222] text-sm font-bold p-4">
                    <div>Feature</div><div className="text-center">Standard</div><div className="text-center text-[#00FF00]">Energy Cube</div>
                  </div>
                  {[{ n: "Backup", s: false, c: true }, { n: "Night", s: false, c: true }, { n: "Grid Ind.", s: false, c: true }].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 border-b border-neutral-100 dark:border-[#222222] last:border-0 p-4 text-sm items-center hover:bg-neutral-50 dark:hover:bg-[#1a1a1a]">
                      <div className="text-neutral-900 dark:text-white font-bold">{row.n}</div>
                      <div className="text-center flex justify-center text-neutral-400">{row.s === false ? <XCircle className="w-5 h-5" /> : "Yes"}</div>
                      <div className="text-center flex justify-center text-[#00FF00]">{row.c === true ? <CheckCircle2 className="w-5 h-5" /> : "Yes"}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <div className="flex-1 w-full" ref={batteryRef}>
              <FadeIn direction="left" delay={200}>
                <div className="bg-black border border-[#222222] rounded-2xl p-6 shadow-2xl relative">
                  <div className="flex items-center justify-between mb-6 border-b border-[#222222] pb-4"><div className="flex items-center gap-3"><Smartphone className="w-5 h-5 text-[#00FF00]" /><span className="font-bold text-white">Live System</span></div><span className="text-xs bg-[#00FF00]/20 text-[#00FF00] font-bold px-2 py-1 rounded-full animate-pulse">Live</span></div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#111111] p-4 rounded-xl border border-[#222222]"><div className="text-neutral-500 font-bold text-xs uppercase mb-1">PV Charger</div><div className="text-2xl font-mono text-[#00FF00] font-bold">2772 W</div></div>
                    <div className="bg-[#111111] p-4 rounded-xl border border-[#00FF00]/30"><div className="text-[#00FF00] font-bold text-xs uppercase mb-1">Battery Level</div><div className="flex items-baseline gap-2"><span className="text-2xl font-mono text-white font-bold">{batteryWidth.toFixed(1)}</span><span className="text-sm font-bold text-[#00FF00]">%</span></div><div className="w-full bg-black h-1.5 mt-2 rounded-full overflow-hidden border border-[#222]"><div className="bg-[#00FF00] h-full rounded-full transition-all duration-1500" style={{ width: `${batteryWidth}%` }}></div></div></div>
                  </div>
                  <div className="text-center text-sm font-medium text-neutral-400">Powered by <span className="text-white font-bold">Cerbo GX</span></div>
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="mt-16 w-full"><div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">{[1,2,3,4].map(i => <FadeIn key={i} delay={i*100}><div className="bg-neutral-100 dark:bg-[#111111] rounded-2xl overflow-hidden border border-neutral-200 dark:border-[#222222] h-48 md:h-56 relative group cursor-pointer"><img src={`/placement-${i}.jpg`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e)=>{e.target.style.display='none';}} /><span className="absolute inset-0 flex items-center justify-center opacity-10 font-bold">PLACEMENT {i}</span></div></FadeIn>)}</div></div>
        </Section>

        {/* How It Works */}
        <div className="bg-white dark:bg-black w-full"><Section id="how-it-works"><FadeIn><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">How it works</h2></div></FadeIn><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => <FadeIn key={i} delay={i*100}><div className="bg-neutral-100 dark:bg-[#111111] rounded-2xl overflow-hidden aspect-video relative group cursor-pointer"><img src={`/how-it-works-${i}.jpg`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e)=>{e.target.style.display='none';}} /><div className="absolute top-4 left-4 w-8 h-8 bg-[#00FF00] text-black rounded-lg flex items-center justify-center font-bold shadow-lg z-10">{i}</div></div></FadeIn>)}</div></Section></div>

        {/* Specs */}
        <div className="bg-neutral-100 dark:bg-[#0a0a0a] border-y border-neutral-200 dark:border-[#222222] w-full"><Section id="specs"><FadeIn><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">Technical Specifications</h2></div></FadeIn><div className="max-w-4xl mx-auto"><FadeIn delay={100}><div className="flex gap-4 mb-8 justify-center">{['single','three'].map(t => <button key={t} onClick={() => setActiveSpecTab(t)} className={`px-6 py-2 rounded-full font-bold transition-all ${activeSpecTab === t ? 'bg-[#00FF00] text-black' : 'bg-white dark:bg-[#111111] text-neutral-600 border dark:border-[#333]'}`}>{t === 'single' ? 'Single Phase' : 'Three Phase'}</button>)}</div></FadeIn><FadeIn delay={200}><div className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-[#222222] rounded-2xl overflow-hidden overflow-x-auto shadow-lg"><table className="w-full text-left border-collapse min-w-[600px]"><thead><tr className="bg-neutral-100 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 text-sm font-extrabold uppercase tracking-wider"><th className="p-4">Model (Amp)</th><th className="p-4">Power</th><th className="p-4">Storage</th><th className="p-4">Wi-Fi</th></tr></thead><tbody className="text-sm font-medium">{[50, 100, 200, 300].map(a => <tr key={a} className="border-b border-neutral-100 dark:border-[#222222] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a]"><td className="p-4 font-mono font-bold text-neutral-900 dark:text-white">{a} amp</td><td className="p-4 text-neutral-600 dark:text-neutral-400">{a*0.3}Kw</td><td className="p-4 text-neutral-600 dark:text-neutral-400">220Kw</td><td className="p-4 text-[#00FF00]"><Check className="w-5 h-5"/></td></tr>)}</tbody></table></div></FadeIn></div></Section></div>

        {/* Case Studies */}
        <Section id="case-studies"><FadeIn><h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-12 text-center">Proven in the Real World</h2></FadeIn><div className="grid md:grid-cols-2 gap-8 mb-8">{[1,2].map(i => <FadeIn key={i} delay={i*100} direction={i===1?'left':'right'}><div className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-[#222222] shadow-sm rounded-2xl overflow-hidden group flex flex-col h-full hover:-translate-y-1 transition-all"><div className="relative h-64 bg-neutral-200 dark:bg-[#1a1a1a] flex items-center justify-center"><div className="absolute inset-0 bg-cover bg-center opacity-90 dark:opacity-40" style={{ backgroundImage: `url('/case-study-${i}.jpg')` }}></div><div className="w-16 h-16 bg-white rounded-full flex items-center justify-center relative z-10 shadow-lg cursor-pointer transform group-hover:scale-110 transition-transform"><div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#00FF00] border-b-8 border-b-transparent ml-1"></div></div></div><div className="p-6 flex-1"><div className="text-[#00FF00] font-bold text-sm mb-2 uppercase">Case Study #{i}</div><h3 className="text-xl font-extrabold text-neutral-900 dark:text-white mb-2">Project Success #{i}</h3><p className="text-neutral-600 dark:text-neutral-400 font-medium text-sm">Real-world results demonstrating high-efficiency energy management and independence.</p></div></div></FadeIn>)}</div></Section>

        {/* Team Section */}
        <div className="bg-black text-white w-full border-t border-[#222]"><Section><FadeIn><div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Meet The Experts</h2></div></FadeIn><div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">{[{ n: "James", r: "Managing Director" }, { n: "Neil", r: "Director" }, { n: "Russell", r: "Tech Manager" }, { n: "Luke", r: "Team Leader" }].map((m, i) => <FadeIn key={i} delay={i*100}><div className="text-center group"><div className="w-32 h-32 mx-auto rounded-full bg-[#111111] border-4 border-[#333] mb-4 overflow-hidden group-hover:border-[#00FF00] transition-all"><div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: `url('/team-${m.n.toLowerCase()}.jpg')` }}></div></div><h4 className="text-white font-bold text-lg group-hover:text-[#00FF00] transition-colors">{m.n}</h4><p className="text-neutral-400 font-medium text-sm">{m.r}</p></div></FadeIn>)}</div></Section></div>

        {/* Partners Marquee */}
        <Section className="py-12 overflow-hidden relative"><div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-50 dark:from-black to-transparent z-10"></div><div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-50 dark:from-black to-transparent z-10"></div><div className="flex animate-marquee hover-pause gap-16 whitespace-nowrap min-w-full items-center"><div className="flex gap-16 items-center px-8">{['e.on', 'Efficiency Awards', 'Solar PV Installer', 'Prestige Awards'].map((p, i) => <div key={i} className="text-center opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all transform hover:scale-110"><div className="text-neutral-900 dark:text-white font-extrabold text-2xl tracking-tighter">{p}</div></div>)}</div><div className="flex gap-16 items-center px-8">{['e.on', 'Efficiency Awards', 'Solar PV Installer', 'Prestige Awards'].map((p, i) => <div key={i+4} className="text-center opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all transform hover:scale-110"><div className="text-neutral-900 dark:text-white font-extrabold text-2xl tracking-tighter">{p}</div></div>)}</div></div></Section>

        {/* FAQ & CTA */}
        <div className="bg-neutral-100 dark:bg-[#0a0a0a] border-t border-neutral-200 dark:border-[#222]"><Section id="contact"><div className="flex flex-col lg:flex-row gap-16"><div className="flex-1"><FadeIn><h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-8">FAQ</h2></FadeIn><div className="flex flex-col gap-4">{[0,1,2].map(i => <FadeIn key={i} delay={i*100}><div className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-[#222222] rounded-xl overflow-hidden shadow-sm"><button onClick={() => toggleFaq(i)} className="w-full text-left p-6 flex items-center justify-between font-bold text-gray-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-[#1a1a1a]">Question {i+1} <ChevronDown className={`w-5 h-5 text-[#00FF00] transition-all duration-300 ${openFaq===i?'rotate-180':''}`} /></button><div className={`overflow-hidden transition-all duration-300 ${openFaq===i?'max-h-48':'max-h-0'}`}><div className="p-6 pt-0 text-neutral-600 dark:text-neutral-400 font-medium text-sm leading-relaxed">Detailed response for the frequently asked question provided here.</div></div></div></FadeIn>)}</div></div><div className="lg:w-[400px]"><FadeIn direction="up"><div className="bg-white dark:bg-[#111111] border-2 border-[#00FF00] p-8 rounded-2xl text-center shadow-2xl sticky top-32"><div className="w-16 h-16 bg-[#00FF00]/10 rounded-full flex items-center justify-center mx-auto mb-6"><Zap className="w-8 h-8 text-[#00FF00] fill-[#00FF00]" /></div><h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-4">Ready to Start?</h3><Button variant="primary" className="w-full mb-4">Free Consultation</Button><p className="text-xs font-bold text-neutral-400 uppercase">No commitment required</p></div></FadeIn></div></div></Section></div>

        {/* Footer */}
        <footer className="bg-black border-t border-[#222] pt-16 pb-8 px-6 md:px-12 lg:px-24 transition-colors duration-500 relative overflow-hidden"><div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"><div className="flex items-center mb-6"><Logo /></div><div><h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Contact</h4><div className="flex flex-col gap-4 text-sm font-medium text-neutral-400"><p><span className="font-bold text-[#00FF00]">A:</span> Unit 16 Harlescott Barns, Shrewsbury</p><p><span className="font-bold text-[#00FF00]">P:</span> (44) 1743-612067</p><p><span className="font-bold text-[#00FF00]">E:</span> info@vetrenenergy.co.uk</p></div></div></div><div className="max-w-7xl mx-auto border-t border-[#222] pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-bold text-neutral-500 gap-4 uppercase tracking-wide"><p>&copy; 2026 Vetren Energy Ltd. All rights reserved.</p></div></footer>
      </div>
    </div>
  );
}
