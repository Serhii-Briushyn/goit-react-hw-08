export function slideInFromLeft(delay) {
  return {
    hidden: { transform: "translateX(-100%)", opacity: 0 },
    visible: {
      transform: "translateX(0)",
      opacity: 1,
      transition: {
        delay,
        duration: 0.5,
      },
    },
    exit: {
      y: -500,
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };
}

export function slideInFromRight(delay) {
  return {
    hidden: { transform: "translateX(100%)", opacity: 0 },
    visible: {
      transform: "translateX(0)",
      opacity: 1,
      transition: {
        delay,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.5 },
    },
  };
}
