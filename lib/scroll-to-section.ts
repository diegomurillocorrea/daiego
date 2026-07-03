export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (!element) return

  const headerOffset = 80
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset

  window.scrollTo({ top, behavior: 'smooth' })
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
