import { PulsingBorder } from "@paper-design/shaders-react";
import type { ComponentProps } from "react";

export default function PulsingBorderShader(
  props: ComponentProps<typeof PulsingBorder>
) {
  return (
    <PulsingBorder
      colors={["#5800FF", "#BEECFF", "#E77EDC", "#FF4C3E"]}
      colorBack="#00000000"
      speed={1.5}
      roundness={1}
      thickness={0.05}
      softness={0.1}
      intensity={1}
      spotSize={0.1}
      pulse={0.2}
      smoke={0.5}
      smokeSize={2}
      scale={0.65}
      rotation={0}
      frame={9161408.251009725}
      {...props}
      style={{
        width: "535px",
        height: "511px",
        borderRadius: "0px",
        backgroundImage:
          "radial-gradient(circle in oklab, oklab(0% 0 -.0001 / 0%) 25.22%, oklab(30.5% 0.029 -0.184) 43.89%, oklab(0% 0 -.0001 / 0%) 60.04%)",
      }}
    />
  );
}
