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

const useGrid = () =>
  useBreakpointValue({
    base: { rows: 20, cols: 20 },
    md: { rows: 25, cols: 25 },
    lg: { rows: 20, cols: 20 },
  }) ?? { rows: 20, cols: 20 };

const useSymbolSizeRange = () =>
  useBreakpointValue({
    base: { min: 12, max: 22 },
    md: { min: 32, max: 55 },
    lg: { min: 32, max: 55 },
  }) ?? { min: 18, max: 47 };

const createGridSymbols = (
  rows: number,
  cols: number,
  minSize: number,
  maxSize: number
): MathSymbol[] => {
  const list: MathSymbol[] = [];
  const cellW = 100 / cols;
  const cellH = 100 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const jitterX = (Math.random() - 0.5) * cellW * 0.6;
      const jitterY = (Math.random() - 0.5) * cellH * 0.6;

      list.push({
        id: r * cols + c,
        rotation: Math.random() * 360,
        animationDelay: Math.random() * 150,
        top: r * cellH + cellH / 2 + jitterY,
        left: c * cellW + cellW / 2 + jitterX,
        animationDuration: Math.random() * 90 + 70,
        size: Math.random() * (maxSize - minSize) + minSize,
        symbol: mathGlyphs[Math.floor(Math.random() * mathGlyphs.length)],
      });
    }
  }
  return list;
};

export const BackgroundTheme = () => {
  const [symbols, setSymbols] = useState<MathSymbol[]>([]);

  const { rows, cols } = useGrid();
  const symbolColor = useColorModeValue("1px solid grey", "1px solid grey");
  const { min, max } = useSymbolSizeRange();
  const backgroundOpacity = useColorModeValue(0.08, 0.06);

  useEffect(() => {
    setSymbols(createGridSymbols(rows, cols, min, max));
  }, [rows, cols, min, max]);

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
          fontWeight="bold"
          userSelect="none"
          top={`${s.top}%`}
          left={`${s.left}%`}
          color={symbolColor}
          position={"absolute"}
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
