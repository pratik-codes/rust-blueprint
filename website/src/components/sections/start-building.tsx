import { Box, Stack, panda } from '@/styled-system/jsx'
import { css, cx } from '@/styled-system/css'
import { button } from '@/styled-system/recipes'
import Link from 'next/link'
import { RiBookLine, RiGithubFill } from 'react-icons/ri'

export const SectionStartBuilding = () => {
  return (
    <panda.section
      py="20"
      bg="linear-gradient(180deg, var(--colors-bg-main) 0%, var(--colors-bg-subtle) 100%)"
    >
      <Box maxW="8xl" mx="auto" px={{ base: '4', md: '6', lg: '8' }}>
        <Stack gap="12" alignItems="center" textAlign="center">
          <Box>
            <panda.h2
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
              mb="4"
              color="text.headline"
            >
              Ready to Build Something Amazing?
            </panda.h2>
            <panda.p
              color="text.muted"
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              mx="auto"
            >
              Join thousands of developers who are building production-ready Rust applications
              with Rust Blueprint. From startups to enterprises, developers trust Rust Blueprint
              to scaffold their next project.
            </panda.p>
          </Box>

          <Stack
            direction={{ base: 'column', sm: 'row' }}
            gap="4"
            w={{ base: 'full', sm: 'auto' }}
          >
            <Link
              href="/docs/getting-started"
              className={cx(
                button({ size: 'xl' }),
                css({
                  bg: 'primary.500',
                  color: 'white',
                  px: '8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2',
                  _hover: { bg: 'primary.600' }
                })
              )}
            >
              <RiBookLine size={20} />
              Read the Docs
            </Link>
            <Link
              href="https://github.com/rust-blueprint/rust-blueprint"
              className={cx(
                button({ size: 'xl', variant: 'outline' }),
                css({
                  px: '8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2'
                })
              )}
            >
              <RiGithubFill size={20} />
              Star on GitHub
            </Link>
          </Stack>

          <Box
            mt="8"
            p="2"
            bg="bg.surface"
            borderRadius="full"
            borderWidth="1px"
            borderColor="border.default"
          >
            <Box
              bg="primary.500"
              color="white"
              px="6"
              py="2"
              borderRadius="full"
              fontSize="sm"
              fontWeight="semibold"
            >
              cargo install rust-blueprint
            </Box>
          </Box>
        </Stack>
      </Box>
    </panda.section>
  )
}
