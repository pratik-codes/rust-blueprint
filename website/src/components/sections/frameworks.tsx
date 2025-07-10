import { Box, Stack, Grid, panda } from '@/styled-system/jsx'
import { css } from '@/styled-system/css'
import { card } from '@/styled-system/recipes'

const frameworks = [
  {
    name: 'Axum',
    description: 'Ergonomic and modular web framework built by the Tokio team',
    features: ['Type-safe routing', 'Middleware system', 'WebSocket support'],
    color: 'primary.500'
  },
  {
    name: 'Actix Web',
    description: 'Powerful, pragmatic, and extremely fast web framework',
    features: ['Actor system', 'HTTP/2 support', 'Static file serving'],
    color: 'accent.500'
  },
  {
    name: 'Rocket',
    description: 'Type-safe web framework with focus on usability and speed',
    features: ['Request guards', 'Built-in testing', 'Automatic JSON'],
    color: 'primary.600'
  },
  {
    name: 'Warp',
    description: 'Composable web server framework with filter system',
    features: ['Filter-based', 'Built on hyper', 'WebSocket support'],
    color: 'accent.600'
  },
  {
    name: 'Tide',
    description: 'Modular web framework built on async-std',
    features: ['Middleware', 'Request routing', 'Cookie support'],
    color: 'primary.700'
  },
  {
    name: 'Poem',
    description: 'Full-featured and easy-to-use web framework',
    features: ['OpenAPI support', 'WebSocket', 'Tower middleware'],
    color: 'accent.700'
  }
]

export const SectionFrameworks = () => {
  return (
    <panda.section bg="bg.main" py="20">
      <Box maxW="8xl" mx="auto" px={{ base: '4', md: '6', lg: '8' }}>
        <Stack gap="12">
          <Box textAlign="center">
            <panda.h2
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
              mb="4"
            >
              Choose Your Framework
            </panda.h2>
            <panda.p
              color="text.muted"
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              mx="auto"
            >
              Support for the most popular Rust web frameworks, each with their own strengths and ecosystem
            </panda.p>
          </Box>

          <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
            {frameworks.map((framework) => (
              <Box
                key={framework.name}
                className={card({ variant: 'outline' })}
                _hover={{ borderColor: framework.color, transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                <panda.h3 
                  fontSize="2xl" 
                  fontWeight="bold" 
                  mb="2"
                  color={framework.color}
                >
                  {framework.name}
                </panda.h3>
                <panda.p color="text.muted" mb="4" fontSize="sm">
                  {framework.description}
                </panda.p>
                <Stack gap="2">
                  {framework.features.map((feature) => (
                    <panda.div
                      key={feature}
                      fontSize="sm"
                      display="flex"
                      alignItems="center"
                      gap="2"
                    >
                      <span className={css({ color: framework.color })}>✓</span>
                      {feature}
                    </panda.div>
                  ))}
                </Stack>
              </Box>
            ))}
          </Grid>

          <Box textAlign="center">
            <panda.p color="text.muted" fontSize="lg">
              All frameworks come with pre-configured routing, error handling, and best practices
            </panda.p>
          </Box>
        </Stack>
      </Box>
    </panda.section>
  )
} 