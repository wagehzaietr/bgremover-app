import useSound from 'use-sound';
import boopSfx from '../assets/clicked.mp3'; // adjust path

const SoundEffect = ({ playOnMount = false }) => {
  const [play] = useSound(boopSfx);
  
  // Play immediately if playOnMount is true
  React.useEffect(() => {
    if (playOnMount) {
      play();
    }
  }, [play, playOnMount]);

  return null; // This component doesn't render anything
};

export default SoundEffect;