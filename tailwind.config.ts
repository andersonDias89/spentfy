export default {
  // ...
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px) translateX(-50%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) translateX(-50%)",
          },
        },
      },
      animation: {
        slideDown: "slideDown 0.3s ease-out",
      },
    },
  },
};
