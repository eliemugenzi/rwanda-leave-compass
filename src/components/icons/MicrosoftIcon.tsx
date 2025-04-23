
import React from "react";

interface MicrosoftIconProps extends React.SVGProps<SVGSVGElement> {}

export const MicrosoftIcon: React.FC<MicrosoftIconProps> = ({
  width = 20,
  height = 20,
  ...props
}) => (
  <svg
    viewBox="0 0 20 20"
    width={width}
    height={height}
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <rect x="1" y="1" width="8" height="8" fill="#F35325" />
    <rect x="11" y="1" width="8" height="8" fill="#81BC06" />
    <rect x="1" y="11" width="8" height="8" fill="#05A6F0" />
    <rect x="11" y="11" width="8" height="8" fill="#FFBA08" />
  </svg>
);
