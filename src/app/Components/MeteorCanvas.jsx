'use client';
import React,{memo} from 'react';
import { loadSlim } from 'tsparticles-slim';
import Particles from 'react-tsparticles';
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
const MeteorsBackground = () => {
    const {theme,toggleTheme}=useContext(ThemeContext)

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: 'transparent',
        },
        particles: {
          number: {
            value: 10, // Fewer meteors for a clean effect
            density: {
              enable: true,
              value_area: 1000,
            },
          },
          color: {
            value: theme==='light'?'#ffffff':'#000000' , // Green meteors
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 1,
          },
          size: {
            value: 4, // Adjust size for better visibility
            random: true,
          },
          move: {
            enable: true,
            speed: 1.5, // Adjust speed
            direction: 'bottom-right', // Free movement
            random: false,
            straight: false,
            outModes: {
              default: 'out',
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'tail', // Creates a tail effect
            },
            onClick: {
              enable: true,
              mode: 'push', // Spawns more meteors on click
            },
          },
          modes: {
            trail: {
              delay: 0.1,
              quantity: 10, // Number of particles following the mouse
              particles: {
                color: {
                  value: '#00ff00', // Green trail
                },
                move: {
                  speed: 1, // Faster than normal movement
                  outModes: {
                    default: 'out',
                  },
                },
                size: {
                  value: 4,
                  random: true,
                },
                opacity: {
                  value: 1,
                },
              },
            },
          },
        },
      }}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default memo(MeteorsBackground);
