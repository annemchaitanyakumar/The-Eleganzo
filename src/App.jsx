import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppRoutes from './routes';
import Cursor from './components/Cursor/Cursor';
import Loader from './components/Loader/Loader';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import useStore from './store/useStore';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  const isLoading = useStore((state) => state.isLoading);
  const setLenis = useStore((state) => state.setLenis);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Save lenis instance to global store for use by other components
    setLenis(lenis);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateScroll = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      setLenis(null);
      gsap.ticker.remove(updateScroll);
    };
  }, []);

  // Scroll to top on route change — must use lenis.scrollTo, not window.scrollTo
  useEffect(() => {
    const l = useStore.getState().lenis;
    if (l) {
      l.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <>
      {isLoading && <Loader />}
      <Cursor />
      <ScrollProgress />
      <AppRoutes />
    </>
  );
}

export default App;
