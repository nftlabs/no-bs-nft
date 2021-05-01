import { extendTheme } from "@chakra-ui/react";

const colors = {
  gradient: "linear-gradient(90deg, #B66EFF, #6D00DB)",
  primary: "#6D00DB",
  violet: "#B66EFF",
  gray: {
    lightest: "#EAEAEA",
    light: "#999999",
    medium: "#666666",
    dark: "#333333",
    darkest: "#111111"
  }
};

const fonts = {
  heading: "Lato",
  body: "Lato",
};

const Button = {
  baseStyle: {
    borderRadius: "4px",
    boxShadow: "none !important",
    _hover: {
      opacity: 0.9,
    },
    _active: {
      opacity: 0.8,
    }
  },
  sizes: {
    small: {
      fontSize: "16px",
      width: "160px",
      height: "40px"
    },
    medium: {
      fontSize: "20px",
      width: "200px",
      height: "50px"
    }
  },
  variants: {
    gradient: {
      bg: "gradient",
      color: "white",
    },
    primary: {
      bg: "white",
      color: "primary",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "gray.lightest"
    },
    plain: {
      bg: "white",
      color: "gray.darkest",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "gray.lightest"
    },
    dark: {
      bg: "gray.darkest",
      color: "white"
    }
  },
  defaultProps: {
    size: "small",
    variant: "gradient"
  }
}

const components = {
  Button,
  Text: {
    variants: {
      label: {
        fontSize: "20px",
        fontWeight: "bold",
      },
      info: {
        fontSize: "14px",
        color: "#999",
      },
      gradient: {
        bgGradient: "linear-gradient(90deg, #F6BE00, #FE01B3)",
        bgClip: "text",
      },
    },
  },
  Heading: {
    baseStyle: {
      fontSize: "40px",
      fontWeight: "bold",
      letterSpacing: "-0.05em",
    },
  },
  Input: {
    baseStyle: {
      field: {
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: "none !important",
        padding: "8px !important",
      },
    },
  },
  Textarea: {
    baseStyle: {
      fontSize: "16px",
      fontWeight: "bold",
      boxShadow: "none !important",
      padding: "8px !important",
    },
  },
  Link: {
    baseStyle: {
      boxShadow: "none !important",
    },
  },
};

const theme = extendTheme({ colors, fonts, components });
export default theme;
