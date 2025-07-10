import { Box, Stack, Grid, panda } from '@/styled-system/jsx'
import { css } from '@/styled-system/css'
import { card } from '@/styled-system/recipes'
import { CommandPrompt } from '../command-prompt'

export const SectionQuickStart = () => {
  return (
    <panda.section bg="bg.subtle" py="20">
      <Box maxW="8xl" mx="auto" px={{ base: '4', md: '6', lg: '8' }}>
        <Stack gap="12">
          <Box textAlign="center">
            <panda.h2
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
              mb="4"
            >
              Get Started in Seconds
            </panda.h2>
            <panda.p
              color="text.muted"
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              mx="auto"
            >
              Three simple commands to go from zero to a production-ready Rust web application
            </panda.p>
          </Box>

          <Grid columns={{ base: 1, md: 3 }} gap="8">
            <Box className={card({ variant: 'outline' })}>
              <panda.h3 fontSize="xl" fontWeight="semibold" mb="4" color="primary.500">
                1. Install
              </panda.h3>
              <CommandPrompt value="cargo install rust-blueprint" />
              <panda.p color="text.muted" mt="4" fontSize="sm">
                Install the Rust Blueprint CLI globally
              </panda.p>
            </Box>

            <Box className={card({ variant: 'outline' })}>
              <panda.h3 fontSize="xl" fontWeight="semibold" mb="4" color="primary.500">
                2. Create
              </panda.h3>
              <CommandPrompt value="rust-blueprint create" />
              <panda.p color="text.muted" mt="4" fontSize="sm">
                Run the interactive CLI to configure your project
              </panda.p>
            </Box>

            <Box className={card({ variant: 'outline' })}>
              <panda.h3 fontSize="xl" fontWeight="semibold" mb="4" color="primary.500">
                3. Run
              </panda.h3>
              <CommandPrompt value="cargo run" />
              <panda.p color="text.muted" mt="4" fontSize="sm">
                Start your new Rust application
              </panda.p>
            </Box>
          </Grid>

          <Box 
            bg="bg.surface" 
            p="6" 
            borderRadius="lg"
            borderWidth="1px"
            borderColor="border.default"
          >
            <panda.h4 fontSize="lg" fontWeight="semibold" mb="3">
              Or use command-line flags for quick setup:
            </panda.h4>
            <CommandPrompt value="rust-blueprint create --name my-api --framework axum --database postgres" />
          </Box>
        </Stack>
      </Box>
    </panda.section>
  )
} 