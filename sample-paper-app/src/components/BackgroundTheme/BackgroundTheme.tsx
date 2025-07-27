import { Box, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useColorModeValue } from "../ui/color-mode";

interface MathSymbol {
  id: number;
  top: number;
  left: number;
  size: number;
  symbol: string;
  rotation: number;
  animationDelay: number;
  animationDuration: number;
}

const mathGlyphs = [
  "∞",
  "π",
  "α",
  "β",
  "γ",
  "δ",
  "ε",
  "ζ",
  "η",
  "θ",
  "λ",
  "μ",
  "ν",
  "ξ",
  "ρ",
  "σ",
  "τ",
  "φ",
  "χ",
  "ψ",
  "ω",
];

const useSymbolCount = () =>
  useBreakpointValue({ base: 420, sm: 420, md: 450, lg: 450, xl: 450 }) ?? 300;

const useSymbolSizeRange = () =>
  useBreakpointValue({
    base: { min: 12, max: 22 },
    md: { min: 32, max: 55 },
    lg: { min: 32, max: 55 },
  }) ?? { min: 18, max: 47 };

const createSymbol = (
  id: number,
  minSize: number,
  maxSize: number
): MathSymbol => ({
  id,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * (maxSize - minSize) + minSize,
  rotation: Math.random() * 360,
  animationDelay: Math.random() * 150,
  animationDuration: Math.random() * 90 + 70,
  symbol: mathGlyphs[Math.floor(Math.random() * mathGlyphs.length)],
});

export const BackgroundTheme = () => {
  const [symbols, setSymbols] = useState<MathSymbol[]>([]);

  const symbolCount = useSymbolCount();
  const { min, max } = useSymbolSizeRange();
  const backgroundOpacity = useColorModeValue(0.08, 0.06);
  const symbolColor = useColorModeValue(
    "1px solid #3bc8f6d6",
    "1px solid #63B3ED"
  );

  useEffect(() => {
    setSymbols(
      Array.from({ length: symbolCount }, (_, i) => createSymbol(i, min, max))
    );
  }, [symbolCount, min, max]);

  return (
    <Box
      inset={0}
      h="100vh"
      w="100vw"
      zIndex={-1}
      position="fixed"
      overflow="hidden"
      pointerEvents="none"
      opacity={backgroundOpacity}
      transition="opacity 0.5s ease"
    >
      {symbols.map((s) => (
        <Box
          key={s.id}
          top={`${s.top}%`}
          left={`${s.left}%`}
          color={symbolColor}
          fontWeight="bold"
          userSelect="none"
          position="absolute"
          fontSize={`${s.size}px`}
          fontFamily="Times New Roman, serif"
          transform={`rotate(${s.rotation}deg)`}
          animationDelay={`${s.animationDelay}s`}
          animation={`float ${s.animationDuration}s ease-in-out infinite`}
        >
          {s.symbol}
        </Box>
      ))}
    </Box>
  );
};
