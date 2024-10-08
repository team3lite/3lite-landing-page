import { cn } from "@/lib/utils";

export default function GrainyBackground({ children, className }) {
  return (
    <div
      className={cn(
        "relative h-full   w-full bg-black overflow-hidden",
        className
      )}
    >
      {/* Base grain layer - purple tint */}
      <div
        className="absolute h-full   inset-0 opacity-30 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' seed='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%238B5CF6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Content */}
      <div className={cn("relative  sm:flex-row h-full w-full flex flex-col")}>
        {children}
      </div>
    </div>
  );
}
