import { css, cx } from '@/styled-system/css'
import { Box, Flex, Stack, panda } from '@/styled-system/jsx'
import { button } from '@/styled-system/recipes'
import { RiGithubFill } from 'react-icons/ri'
import Link from 'next/link'
import { CommandPrompt } from '../command-prompt'

export const SectionHero = () => {
  return (
    <panda.section bg="bg.main">
      <Box maxW="8xl" mx="auto" px={{ base: '4', md: '6', lg: '8' }}>
        <Box pt="40" pb="24" position="relative">
          <panda.h4
            color="text.muted"
            fontSize="2xl"
            letterSpacing="tight"
            fontWeight="medium"
            maxW="4xl"
            mb="24"
            hideBelow="md"
          >
            Generate production-ready Rust web applications in seconds with
            support for popular frameworks, databases, and modern tooling
          </panda.h4>

          <Flex gap="8" align="center">
            <Stack gap="12" flex="1">
              <div>
                <panda.p
                  fontSize={{ base: '2.5rem', sm: '3rem' }}
                  letterSpacing="tight"
                  fontWeight="bold"
                  lineHeight="1.2"
                  maxW={{ base: '40rem', md: 'unset' }}
                >
                  Blazingly fast project scaffolding for
                </panda.p>

                <panda.h1
                  color="primary.500"
                  fontSize={{ base: '5rem', sm: '8rem', lg: '10rem' }}
                  fontWeight="bold"
                  letterSpacing="tighter"
                  lineHeight="1"
                  display="flex"
                  alignItems="center"
                  gap="4"
                >
                  <span className={css({ fontSize: '0.8em' })}>🦀</span>
                  Rust
                </panda.h1>
              </div>
              <Stack
                align="center"
                direction={{ base: 'column', sm: 'row' }}
                gap="6"
              >
                <Link
                  href="/docs"
                  className={cx(
                    button({ color: 'main', size: 'lg' }),
                    css({ 
                      w: { base: 'full', sm: '240px' },
                      bg: 'primary.500',
                      color: 'white',
                      _hover: { bg: 'primary.600' }
                    })
                  )}
                >
                  Get Started
                </Link>
                <Link
                  href="https://github.com/rust-blueprint/rust-blueprint"
                  className={cx(
                    button({ color: 'black', size: 'lg' }),
                    css({ 
                      w: { base: 'full', sm: '240px' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2'
                    })
                  )}
                >
                  <RiGithubFill size={20} />
                  View on GitHub
                </Link>
              </Stack>

              <CommandPrompt value="cargo install rust-blueprint" />
            </Stack>

            <Box
              className={css({ 
                display: { base: 'none', lg: 'block' },
                fontSize: '20rem',
                opacity: 0.1,
                userSelect: 'none'
              })}
            >
              🦀
            </Box>
          </Flex>
        </Box>
      </Box>
    </panda.section>
  )
}
