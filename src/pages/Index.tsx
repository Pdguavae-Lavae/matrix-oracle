import MatrixRain from '@/components/MatrixRain';
import Magic8Ball from '@/components/Magic8Ball';

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Dark overlay for better readability */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(120 100% 2% / 0.8) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 p-4">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-glow tracking-wider mb-4">
          MATRIX 8 BALL
        </h1>

        {/* Magic 8 Ball */}
        <Magic8Ball />

        {/* Footer hint */}
        <p className="mt-8 text-muted-foreground text-xs tracking-wider opacity-60">
          v1.0 • Despierta, Neo...
        </p>
      </div>
    </div>
  );
};

export default Index;
