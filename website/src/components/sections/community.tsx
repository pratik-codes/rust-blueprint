import { Box, Stack, Grid, panda } from '@/styled-system/jsx'
import { css, cx } from '@/styled-system/css'
import { button } from '@/styled-system/recipes'
import Link from 'next/link'
import { RiDiscordFill, RiGithubFill, RiTwitterXFill } from 'react-icons/ri'

const communityLinks = [
  {
    icon: RiGithubFill,
    title: 'GitHub',
    description: 'Star, contribute, and follow development',
    href: 'https://github.com/rust-blueprint/rust-blueprint'
  },
  {
    icon: RiDiscordFill,
    title: 'Discord',
    description: 'Join our community for help and discussions',
    href: 'https://discord.gg/rust-blueprint'
  },
  {
    icon: RiTwitterXFill,
    title: 'Twitter',
    description: 'Follow for updates and announcements',
    href: 'https://twitter.com/rustblueprint'
  }
]

export const SectionCommunity = () => {
  return (
    <panda.section
      bg="bg.subtle"
      borderTop="1px solid"
      borderColor="border.subtle"
      py="20"
    >
      <Box maxW="8xl" mx="auto" px={{ base: '4', md: '6', lg: '8' }}>
        <Stack gap="12">
          <Box textAlign="center">
            <panda.h2
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
              mb="4"
            >
              Join the Community
            </panda.h2>
            <panda.p
              color="text.muted"
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              mx="auto"
            >
              Be part of the growing Rust Blueprint community. Get help, share your projects,
              and contribute to making Rust development even better.
            </panda.p>
          </Box>

          <Grid columns={{ base: 1, md: 3 }} gap="8">
            {communityLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={css({
                    display: 'block',
                    p: '6',
                    bg: 'bg.surface',
                    borderRadius: 'lg',
                    borderWidth: '1px',
                    borderColor: 'border.default',
                    transition: 'all 0.2s',
                    _hover: {
                      borderColor: 'primary.500',
                      transform: 'translateY(-2px)',
                      boxShadow: 'md'
                    }
                  })}
                >
                  <Stack gap="4">
                    <Icon size={32} className={css({ color: 'primary.500' })} />
                    <panda.h3 fontSize="xl" fontWeight="semibold">
                      {link.title}
                    </panda.h3>
                    <panda.p color="text.muted" fontSize="sm">
                      {link.description}
                    </panda.p>
                  </Stack>
                </Link>
              )
            })}
          </Grid>

          <Box
            textAlign="center"
            p="8"
            bg="primary.50"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="primary.200"
          >
            <panda.h3 fontSize="2xl" fontWeight="bold" mb="2" color="primary.700">
              Contributing
            </panda.h3>
            <panda.p color="primary.600" mb="6">
              Rust Blueprint is open source and welcomes contributions!
            </panda.p>
            <Link
              href="https://github.com/rust-blueprint/rust-blueprint/blob/main/CONTRIBUTING.md"
              className={cx(
                button({ size: 'lg' }),
                css({
                  bg: 'primary.500',
                  color: 'white',
                  _hover: { bg: 'primary.600' }
                })
              )}
            >
              Learn How to Contribute
            </Link>
          </Box>
        </Stack>
      </Box>
    </panda.section>
  )
}
