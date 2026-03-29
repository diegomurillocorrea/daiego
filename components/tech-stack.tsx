'use client'

import type { ComponentType } from 'react'
import type { IconType } from 'react-icons'

import { AntigravityIcon } from '@/components/icons/antigravity-icon'
import { CursorIdeIcon } from '@/components/icons/cursor-ide-icon'
import { NeonIcon } from '@/components/icons/neon-icon'
import { PencilDevIcon } from '@/components/icons/pencil-dev-icon'
import { DiGitBranch, DiMsqlServer, DiVisualstudio } from 'react-icons/di'
import {
  SiBootstrap,
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiFigma,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGooglecloud,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiRender,
  SiShadcnui,
  SiSupabase,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import { FaAws, FaCss3Alt } from 'react-icons/fa'
import { IoInfinite } from 'react-icons/io5'

type CustomIconComponent = ComponentType<{ className?: string }>

type TechItem =
  | { name: string; Icon: IconType }
  | { name: string; CustomIcon: CustomIconComponent }

/** Tailwind arbitrary: tint icons to ~primary green */
const techIconGreenFilterClass =
  '[filter:brightness(0)_saturate(100%)_invert(56%)_sepia(57%)_saturate(1800%)_hue-rotate(118deg)_brightness(95%)_contrast(101%)]'

const TECH_ITEMS: TechItem[] = [
  { name: 'HTML', Icon: SiHtml5 },
  { name: 'CSS', Icon: FaCss3Alt },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'TailwindCSS', Icon: SiTailwindcss },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'Vercel', Icon: SiVercel },
  { name: 'Bootstrap', Icon: SiBootstrap },
  { name: 'Shadcn', Icon: SiShadcnui },
  { name: 'Python', Icon: SiPython },
  { name: 'FastAPI', Icon: SiFastapi },
  { name: '.NET', Icon: SiDotnet },
  { name: 'SQL Server', Icon: DiMsqlServer },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'Supabase', Icon: SiSupabase },
  { name: 'Neon', CustomIcon: NeonIcon },
  { name: 'Render', Icon: SiRender },
  { name: 'AWS', Icon: FaAws },
  { name: 'Google Cloud', Icon: SiGooglecloud },
  { name: 'Nginx', Icon: SiNginx },
  { name: 'SwaggerUI', Icon: SiSwagger },
  { name: 'Postman', Icon: SiPostman },
  { name: 'Docker', Icon: SiDocker },
  { name: 'DevOps', Icon: IoInfinite },
  { name: 'Git', Icon: SiGit },
  { name: 'GitHub', Icon: SiGithub },
  { name: 'GitLab', Icon: SiGitlab },
  { name: 'GitFlow', Icon: DiGitBranch },
  { name: 'Figma', Icon: SiFigma },
  { name: 'Pencil.dev', CustomIcon: PencilDevIcon },
  { name: 'Cursor IDE', CustomIcon: CursorIdeIcon },
  { name: 'Visual Studio IDE', Icon: DiVisualstudio },
  { name: 'Antigravity', CustomIcon: AntigravityIcon },
]

type TechSlideProps = {
  item: TechItem
  ariaHidden?: boolean
}

const TechSlide = ({ item, ariaHidden }: TechSlideProps) => {
  return (
    <li
      className="relative aspect-square w-[min(42vw,148px)] shrink-0 sm:w-[152px] md:w-[160px]"
      aria-hidden={ariaHidden}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-3xl border border-white/8 bg-[#111111] p-3 text-center shadow-sm transition-colors duration-300 hover:border-accent/20 sm:gap-2.5 sm:p-3.5">
        <span
          className={`flex size-9 shrink-0 items-center justify-center sm:size-10 ${techIconGreenFilterClass} [&_svg]:h-full [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:w-full`}
          aria-hidden
        >
          {'CustomIcon' in item ? (
            <item.CustomIcon className="h-full w-full max-h-full max-w-full object-contain" />
          ) : (
            <item.Icon className="h-full w-full max-h-full max-w-full object-contain" title="" />
          )}
        </span>
        <span className="line-clamp-2 w-full px-0.5 text-[10px] font-semibold leading-tight text-white sm:text-xs">
          {item.name}
        </span>
      </div>
    </li>
  )
}

const MARQUEE_ROW_COUNT = 3

const splitItemsIntoRows = (items: TechItem[], rowCount: number): TechItem[][] => {
  const chunk = Math.ceil(items.length / rowCount)
  return Array.from({ length: rowCount }, (_, rowIndex) =>
    items.slice(rowIndex * chunk, rowIndex * chunk + chunk),
  )
}

const TechMarqueeTrack = ({
  items,
  rowIndex,
}: {
  items: TechItem[]
  rowIndex: number
}) => (
  <div className="w-full min-w-0 overflow-hidden">
    <div className="tech-stack-marquee">
      <ul className="flex w-max list-none flex-row gap-x-6 gap-y-0 sm:gap-x-8 md:gap-x-10">
        {items.map((item, index) => (
          <TechSlide
            key={`r${rowIndex}-1-${index}-${item.name}`}
            item={item}
          />
        ))}
        {items.map((item, index) => (
          <TechSlide
            key={`r${rowIndex}-2-${index}-${item.name}`}
            item={item}
            ariaHidden
          />
        ))}
      </ul>
    </div>
  </div>
)

export function TechStack() {
  const techRows = splitItemsIntoRows(TECH_ITEMS, MARQUEE_ROW_COUNT)

  return (
    <section
      className="w-full border-t border-border bg-background py-20"
      aria-labelledby="tech-stack-heading"
    >
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center sm:mb-14">
          <h2
            id="tech-stack-heading"
            className="section-heading-ruby-line text-4xl font-bold text-foreground lg:text-5xl"
          >
            Technologies
          </h2>
          <p className="text-lg text-foreground/60">
            Tools and platforms we use to design, build, and ship software
          </p>
        </div>

        <p className="sr-only">
          Technologies we use: {TECH_ITEMS.map((item) => item.name).join(', ')}.
        </p>

        <div className="relative w-full overflow-hidden" aria-hidden>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-background to-transparent sm:w-20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-background to-transparent sm:w-20"
            aria-hidden
          />

          <div className="flex flex-col gap-4 sm:gap-5">
            {techRows.map((rowItems, rowIndex) => (
              <TechMarqueeTrack
                key={`marquee-row-${rowIndex}`}
                items={rowItems}
                rowIndex={rowIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
