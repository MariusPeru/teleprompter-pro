import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  strokeWidth: 2,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};

export const PlayIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M5 3l14 9-14 9V3z"></path>
  </svg>
);

export const PauseIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M6 4h4v16H6zM14 4h4v16h-4z"></path>
  </svg>
);

export const PlusIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M12 5v14m-7-7h14"></path>
  </svg>
);

export const MinusIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M5 12h14"></path>
  </svg>
);

export const ResetIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M3 9H1v13h13v-2M18 10V4.5A1.5 1.5 0 0016.5 3h-12A1.5 1.5 0 003 4.5v12A1.5 1.5 0 004.5 18H10"></path><path d="M22 13.5a5.5 5.5 0 10-7.23 4.81"></path><path d="M22 13h-4v4"></path>
  </svg>
);


export const TextSizeIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M4 7V6h16v1M12 6V4M7 18h10M12 18V7" />
    </svg>
);
