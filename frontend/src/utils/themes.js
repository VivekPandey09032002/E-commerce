import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"
const replaceExsiting = {
  variants: {
    filled: {
      field: {
        _focus: {
          borderColor: "blue.300",
        },
      },
    },
  },
  sizes: {
    md: {
      field: {
        borderRadius: "none",
      },
    },
  },
}

const theme = extendTheme(
  {
    colors: {
      brand: {
        50: "#f5fee5",
        100: "#e1fbb2",
        200: "#cdf781",
        300: "#b8ee56",
        400: "#a2e032",
        500: "#8ac919",
        600: "#71ab09",
        700: "#578602",
        800: "#3c5e00",
        900: "#203300",
      },
      redTheme: {
        100: "#FD841F",
        200: "#E14D2A",
        300: "#CD104D",
        400: "#9C2C77",
      },
      purpleTheme: {
        100: "#E5B8F4",
        200: "#C147E9",
        300: "#810CA8",
        400: "#2D033B",
      },
    },

    fonts: {
      heading: `Montserrat, ${base.fonts.heading} `,
      body: "Inter",
    },
    components: {
      Button: {
        variants: {
          primary: (props) => ({
            rounded: "none",
            _focus: {
              ring: 2,
              ringColor: "brand.500",
            },
            backgroundColor: mode("brand.400", "brand.600")(props),
            color: mode("brand.900", "white")(props),
            _hover: {
              backgroundColor: mode("brand.600", "brand.400")(props),
              color: mode("brand.900", "blackAlpha.700")(props),
            },
          }),
          secondary: (props) => ({
            rounded: "md",
            _focus: {
              ring: 2,
              ringColor: "redTheme.200",
            },
            backgroundColor: mode("redTheme.200", "redTheme.200")(props),
            color: mode("black", "white")(props),
            _hover: {
              backgroundColor: mode("redTheme.300", "redTheme.300")(props),
              color: mode("white", "black")(props),
            },
          }),
          purple: (props) => ({
            rounded: "md",
            _focus: {
              ring: 2,
              ringColor: "purpleTheme.200",
            },
            backgroundColor: mode("purpleTheme.200", "purpleTheme.200")(props),
            color: mode("black", "white")(props),
            _hover: {
              backgroundColor: mode(
                "purpleTheme.300",
                "purpleTheme.300"
              )(props),
              color: mode("white", "black")(props),
            },
          }),
        },
      },
      Textarea: {
        variants: {
          filled: {
            _focus: {
              borderColor: "brand.500",
            },
          },
        },
        sizes: {
          md: {
            borderRadius: "none",
          },
        },
      },
      Input: { ...replaceExsiting },
      Select: { ...replaceExsiting },
      Checkbox: {
        baseStyle: {
          control: {
            _focus: {
              ring: 2,
              ringColor: "brand.500",
            },
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
  }),
  withDefaultVariant({
    variant: "filled",
    components: ["Input", "Select", "Textarea"],
  })
)

export default theme
