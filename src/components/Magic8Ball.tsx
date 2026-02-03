import { useState, useCallback } from 'react';

const ACTIONS = [
  "Llama a un viejo amigo",
  "Sal a caminar ahora",
  "Escribe tus pensamientos",
  "Aprende algo nuevo hoy",
  "Haz una buena acción",
  "Medita 5 minutos",
  "Organiza tu espacio",
  "Cocina algo especial",
  "Lee un capítulo",
  "Envía un mensaje de amor",
  "Desconéctate 1 hora",
  "Haz ejercicio",
  "Prueba comida nueva",
  "Escucha música diferente",
  "Dibuja algo",
  "Planifica tu semana",
  "Perdona a alguien",
  "Di la verdad difícil",
  "Toma una foto artística",
  "Baila sin razón",
];

const Magic8Ball = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [showAction, setShowAction] = useState(false);

  const handleClick = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowAction(false);
    setCurrentAction(null);

    // Select random action
    const randomAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    
    // Show action after spin
    setTimeout(() => {
      setCurrentAction(randomAction);
      setShowAction(true);
    }, 1500);

    // End spinning
    setTimeout(() => {
      setIsSpinning(false);
    }, 2000);
  }, [isSpinning]);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Instruction text */}
      <p className="text-foreground/80 text-sm tracking-widest pulse-text uppercase">
        Toca la bola para tu acción
      </p>

      {/* The 8 Ball */}
      <div
        onClick={handleClick}
        className={`
          relative w-72 h-72 md:w-80 md:h-80 rounded-full cursor-pointer
          magic-ball transition-transform duration-300
          ${isSpinning ? 'ball-spinning' : 'hover:scale-105'}
        `}
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Inner window */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, hsl(120 50% 8%) 0%, hsl(120 100% 2%) 100%)',
              boxShadow: 'inset 0 0 20px hsl(0 0% 0% / 0.8)',
            }}
          >
            {/* Diamond shape */}
            {showAction && currentAction && (
              <div 
                className={`
                  w-20 h-20 md:w-24 md:h-24 flex items-center justify-center
                  diamond-reveal diamond-glow
                `}
                style={{
                  background: 'linear-gradient(135deg, hsl(120 100% 20%) 0%, hsl(120 100% 10%) 100%)',
                  transform: 'rotate(45deg)',
                  border: '2px solid hsl(120 100% 40%)',
                }}
              >
                <span 
                  className="text-foreground text-[10px] md:text-xs font-bold text-center leading-tight px-1"
                  style={{ transform: 'rotate(-45deg)' }}
                >
                  {currentAction}
                </span>
              </div>
            )}

            {/* 8 when idle */}
            {!showAction && !isSpinning && (
              <span className="text-5xl md:text-6xl font-bold text-glow text-foreground">
                8
              </span>
            )}

            {/* Loading state */}
            {isSpinning && !showAction && (
              <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        </div>
      </div>

      {/* Current action display */}
      {showAction && currentAction && (
        <div className="text-center max-w-xs px-4 animate-fade-in">
          <p className="text-foreground text-lg md:text-xl font-bold text-glow">
            {currentAction}
          </p>
        </div>
      )}
    </div>
  );
};

export default Magic8Ball;
