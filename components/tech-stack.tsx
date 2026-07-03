'use client'

import type { ComponentType } from 'react'
import { useMemo } from 'react'
import type { IconType } from 'react-icons'
import { NeonIcon } from '@/components/icons/neon-icon'
import { DiMsqlServer } from 'react-icons/di'
import {
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiGooglecloud,
  SiGooglegemini,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiRender,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiVercel,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { Bot, type LucideIcon, Workflow } from 'lucide-react'
import { useDictionary } from '@/components/i18n/locale-provider'
import { FadeIn, RevealHeading } from '@/components/motion'

type CustomIconComponent = ComponentType<{ className?: string }>

type TechItem =
  | { name: string; Icon: IconType }
  | { name: string; CustomIcon: CustomIconComponent }
  | { name: string; LucideIcon: LucideIcon }

interface TechCategory {
  title: string
  items: TechItem[]
}

const techIconGreenFilterClass =
  '[filter:brightness(0)_saturate(100%)_invert(56%)_sepia(57%)_saturate(1800%)_hue-rotate(118deg)_brightness(95%)_contrast(101%)]'

const TechPill = ({ item }: { item: TechItem }) => (
  <li className="flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 py-2.5 transition-colors duration-300 hover:border-primary/40">
    {'LucideIcon' in item ? (
      <item.LucideIcon className="size-5 shrink-0 text-primary" aria-hidden />
    ) : (
      <span
        className={`flex size-5 shrink-0 items-center justify-center ${techIconGreenFilterClass} [&_svg]:h-full [&_svg]:w-full`}
        aria-hidden
      >
        {'CustomIcon' in item ? (
          <item.CustomIcon className="h-full w-full object-contain" />
        ) : (
          <item.Icon className="h-full w-full object-contain" title="" />
        )}
      </span>
    )}
    <span className="text-sm font-medium whitespace-nowrap text-foreground">{item.name}</span>
  </li>
)

export function TechStack() {
  const { techStack } = useDictionary()

  const techCategories = useMemo<TechCategory[]>(
    () => [
      {
        title: techStack.categories.frontend,
        items: [
          { name: 'Next.js', Icon: SiNextdotjs },
          { name: 'React', Icon: SiReact },
          { name: 'Tailwind CSS', Icon: SiTailwindcss },
          { name: 'Shadcn UI', Icon: SiShadcnui },
        ],
      },
      {
        title: techStack.categories.backend,
        items: [
          { name: '.NET', Icon: SiDotnet },
          { name: 'FastAPI', Icon: SiFastapi },
          { name: 'Node.js', Icon: SiNodedotjs },
        ],
      },
      {
        title: techStack.categories.databases,
        items: [
          { name: 'PostgreSQL', Icon: SiPostgresql },
          { name: 'SQL Server', Icon: DiMsqlServer },
          { name: 'Supabase', Icon: SiSupabase },
          { name: 'Neon', CustomIcon: NeonIcon },
        ],
      },
      {
        title: techStack.categories.cloudDevops,
        items: [
          { name: 'Vercel', Icon: SiVercel },
          { name: 'Render', Icon: SiRender },
          { name: 'Docker', Icon: SiDocker },
          { name: 'Google Cloud', Icon: SiGooglecloud },
          { name: 'AWS', Icon: FaAws },
        ],
      },
      {
        title: techStack.categories.aiAutomation,
        items: [
          { name: 'OpenAI', Icon: SiOpenai },
          { name: 'Gemini', Icon: SiGooglegemini },
          { name: techStack.items.aiAgents, LucideIcon: Bot },
          { name: techStack.items.workflowAutomation, LucideIcon: Workflow },
        ],
      },
    ],
    [techStack],
  )

  const allTechItems = useMemo(
    () => techCategories.flatMap((category) => category.items),
    [techCategories],
  )

  return (
    <section
      id="technologies"
      className="w-full border-t border-border py-20"
      aria-labelledby="tech-stack-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <RevealHeading title={techStack.title} subtitle={techStack.subtitle} />
        </div>

        <FadeIn>
          <div className="group/marquee relative overflow-hidden rounded-2xl border border-border bg-background/40 py-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background/40 to-transparent" aria-hidden />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background/40 to-transparent" aria-hidden />
            <div className="tech-stack-marquee flex gap-3 px-4 group-hover/marquee:[animation-play-state:paused]">
              {[...allTechItems, ...allTechItems].map((item, i) => (
                <div key={`${item.name}-${i}`} className="shrink-0">
                  <TechPill item={item} />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {techCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-border bg-background/40 p-6 transition-colors duration-300 hover:border-primary/30"
              >
                <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground/80">
                  <span className="h-px w-6 bg-linear-to-r from-accent/60 to-primary/60" aria-hidden />
                  {category.title}
                </h3>
                <ul className="flex flex-wrap gap-2.5">
                  {category.items.map((item) => (
                    <TechPill key={item.name} item={item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
