import { extendTheme,theme as base, withDefaultColorScheme, withDefaultVariant } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
      brand : {
        50 : "#f5fee5",
        100 : "#e1fbb2",
        200 : "#cdf781",
        100 : "#b8ee56",
        100 : "#a2e032",
        100 : "#8ac919",
        100 : "#71ab09",
        100 : "#578602",
        100 : "#3c5e00",
        100 : "#203300",
      },
      bgBlack: "#0E0E0E",
      secBlack : "#1c1c1c",
      font: {
        white: "#FFFFFF",
        black: "#292929",
      },
      logo: "#5A2E9A",
      search: {
        before: "#AAAAAA",
      },
    },
    fonts : { 
      body : "Poppins, Arial",
      heading : "'Montserrat', sans-serif"
    },
    components : {
      Input : {
        sizes : {
          md : {
            field : {
              borderRadius : "none"
            }
          }
        },
        variants : {
          filled : "brand"
        }
      }
    }
},withDefaultColorScheme({
  colorScheme : "brand",
  components : ["Input","Select"]
}), withDefaultVariant({
  variants : {
    filled : {
      field : {
        _focus : {
          borderColor : "brand.500"
        }
      }
    }
  }
}));

export default theme