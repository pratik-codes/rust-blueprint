import { Box, Stack, Grid, panda } from '@/styled-system/jsx'
import { css } from '@/styled-system/css'
import { 
  RiDatabase2Line, 
  RiShipLine, 
  RiCodeSSlashLine, 
  RiFlashlightLine,
  RiGitBranchLine,
  RiTerminalBoxLine,
  RiFileTextLine,
  RiTestTubeLine 
} from 'react-icons/ri'

const features = [
  {
    icon: RiFlashlightLine,
    title: 'Lightning Fast',
    description: 'Generate a complete project structure in under 10 seconds with all dependencies configured'
  },
  {
    icon: RiDatabase2Line,
    title: 'Database Ready',
    description: 'Pre-configured connections for PostgreSQL, MySQL, SQLite, MongoDB, Redis, and ScyllaDB'
  },
  {
    icon: RiShipLine,
    title: 'Production Ready',
    description: 'Docker configs, CI/CD workflows, and deployment scripts included out of the box'
  },
  {
    icon: RiCodeSSlashLine,
    title: 'Type Safety',
    description: 'Leverage Rust\'s powerful type system with pre-configured linting and formatting'
  },
  {
    icon: RiGitBranchLine,
    title: 'Git Integration',
    description: 'Automatic git initialization with sensible .gitignore and commit conventions'
  },
  {
    icon: RiTerminalBoxLine,
    title: 'Interactive CLI',
    description: 'Beautiful terminal UI with step-by-step project configuration'
  },
  {
    icon: RiFileTextLine,
    title: 'API Documentation',
    description: 'OpenAPI/Swagger integration for automatic API documentation'
  },
  {
    icon: RiTestTubeLine,
    title: 'Testing Setup',
    description: 'Unit, integration, and E2E test configurations with example tests'
  }
]

export const SectionFeatures = () => {
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
              Everything You Need
            </panda.h2>
            <panda.p
              color="text.muted"
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              mx="auto"
            >
              From development to deployment, Rust Blueprint has you covered with modern tooling and best practices
            </panda.p>
          </Box>

          <Grid columns={{ base: 1, md: 2, lg: 4 }} gap="8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Stack key={feature.title} gap="4">
                  <Box
                    bg="primary.500"
                    color="white"
                    borderRadius="lg"
                    p="3"
                    w="fit-content"
                  >
                    <Icon size={24} />
                  </Box>
                  <panda.h3 fontSize="xl" fontWeight="semibold">
                    {feature.title}
                  </panda.h3>
                  <panda.p color="text.muted" fontSize="sm">
                    {feature.description}
                  </panda.p>
                </Stack>
              )
            })}
          </Grid>

          <Box 
            mt="8"
            p="8"
            bg="bg.surface"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="border.default"
          >
            <Grid columns={{ base: 1, md: 2 }} gap="8" alignItems="center">
              <div>
                <panda.h3 fontSize="2xl" fontWeight="bold" mb="4">
                  Advanced Features
                </panda.h3>
                <Stack gap="3">
                  {[
                    'GraphQL with async-graphql or Juniper',
                    'WebSocket support for real-time apps',
                    'OpenTelemetry for observability',
                    'HTMX or Leptos for frontend',
                    'GitHub Actions workflows'
                  ].map((feature) => (
                    <panda.div
                      key={feature}
                      display="flex"
                      alignItems="center"
                      gap="2"
                    >
                      <span className={css({ color: 'primary.500' })}>→</span>
                      {feature}
                    </panda.div>
                  ))}
                </Stack>
              </div>
              <Box
                fontSize="8rem"
                textAlign="center"
                opacity={0.1}
                userSelect="none"
              >
                ⚙️
              </Box>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </panda.section>
  )
} 