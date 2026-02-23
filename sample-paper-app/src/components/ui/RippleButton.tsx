import { Button, type ButtonProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { forwardRef, useState } from "react";

const MotionSpan = motion.span;

type RippleButtonProps = ButtonProps & {
  rippleColor?: string;
};

type RippleState = {
  x: number;
  y: number;
  size: number;
  key: number;
};

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ children, onPointerDown, rippleColor = "#045f25", ...rest }, ref) => {
    const [ripple, setRipple] = useState<RippleState | null>(null);

    const handlePointerDown: RippleButtonProps["onPointerDown"] = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const maxRadius = Math.hypot(rect.width, rect.height);
      setRipple({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        size: maxRadius * 2,
        key: Date.now(),
      });
      onPointerDown?.(event);
    };

    return (
      <Button
        ref={ref}
        position="relative"
        overflow="hidden"
        transition="transform 0.12s ease"
        _active={{ transform: "scale(0.97)" }}
        onPointerDown={handlePointerDown}
        {...rest}
      >
        {children}
        {ripple && (
          <MotionSpan
            key={ripple.key}
            style={
              {
                "--ripple-x": `${ripple.x}px`,
                "--ripple-y": `${ripple.y}px`,
                "--ripple-end": `${ripple.size}px`,
                position: "absolute",
                inset: 0,
                backgroundColor: rippleColor,
                opacity: 0.35,
                pointerEvents: "none",
                maskImage:
                  "radial-gradient(circle var(--ripple-size) at var(--ripple-x) var(--ripple-y), #000 0%, #000 60%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(circle var(--ripple-size) at var(--ripple-x) var(--ripple-y), #000 0%, #000 60%, transparent 100%)",
              } as React.CSSProperties
            }
            initial={{ "--ripple-size": "0px", opacity: 0.35 }}
            animate={{ "--ripple-size": "var(--ripple-end)", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0, 0.1, 0.8, 1] }}
          />
        )}
      </Button>
    );
  },
);

RippleButton.displayName = "RippleButton";