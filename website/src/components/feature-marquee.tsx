import { Box, panda } from '@/styled-system/jsx'
import Marquee from 'react-fast-marquee'
import { css } from '@/styled-system/css'

const features = [
  '⚡ Lightning Fast',
  '🦀 Pure Rust',
  '🚀 Production Ready',
  '🔧 Framework Agnostic',
  '🗄️ Database Support',
  '🐳 Docker Ready',
  '📊 Telemetry Built-in',
  '🧪 Testing Included',
  '📝 Type Safe',
  '🔄 CI/CD Workflows',
  '🌐 GraphQL Support',
  '🔌 WebSocket Ready'
]

export const FeatureMarquee = () => (
  <panda.div borderY="1px solid" borderColor="border.subtle" bg="bg.subtle">
    <Marquee
      gradient
      gradientColor="hsl(0 0% 99%)"
      speed={40}
      className={css({ fontSize: { base: 'lg', md: 'xl' }, py: '6' })}
    >
      <Box mr="12">
        {features.map((feature, i) => (
          <panda.span
            key={i}
            fontWeight="semibold"
            _before={{
              content: i === 0 ? '""' : '"•"',
              mx: '12',
              color: 'primary.500'
            }}
          >
            {feature}
          </panda.span>
        ))}
      </Box>
    </Marquee>
  </panda.div>
)
