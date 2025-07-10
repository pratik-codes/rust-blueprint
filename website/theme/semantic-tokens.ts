import { defineSemanticTokens } from '@pandacss/dev'

export const semanticTokens = defineSemanticTokens({
  colors: {
    text: {
      main: { value: { base: '{colors.gray.700}', _dark: '{colors.gray.100}' } },
      muted: { value: { base: '{colors.gray.600}', _dark: '{colors.gray.400}' } },
      headline: { value: { base: '{colors.gray.900}', _dark: 'white' } }
    },
    bg: {
      main: { value: { base: 'white', _dark: '{colors.gray.950}' } },
      subtle: { value: { base: '{colors.gray.50}', _dark: '{colors.gray.900}' } },
      surface: { value: { base: 'white', _dark: '{colors.gray.900}' } },
      inverted: { value: { base: '{colors.yellow.300}', _dark: '{colors.dark}' } }
    },
    border: {
      default: { value: { base: '{colors.gray.200}', _dark: '{colors.gray.800}' } },
      subtle: { value: { base: '{colors.gray.100}', _dark: '{colors.gray.800}' } }
    },
    primary: {
      DEFAULT: { value: { base: '{colors.primary.500}', _dark: '{colors.primary.400}' } },
      hover: { value: { base: '{colors.primary.600}', _dark: '{colors.primary.500}' } }
    },
    accent: {
      DEFAULT: { value: { base: '{colors.accent.500}', _dark: '{colors.accent.400}' } },
      hover: { value: { base: '{colors.accent.600}', _dark: '{colors.accent.500}' } }
    }
  }
})
