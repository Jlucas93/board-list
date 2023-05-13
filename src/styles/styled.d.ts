import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      primary: string;
      secondary: string;
      terciary: string;
    },
    header: string,
    background: string;
    text: string;
  }
}