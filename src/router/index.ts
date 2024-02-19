import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import type { ComponentOptionsMixin, DefineComponent, ExtractPropTypes, PublicProps } from 'vue'

type pageComponent = DefineComponent<
  {},
  {},
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<ExtractPropTypes<{}>>,
  {},
  {}
>

export const routes: Record<string, pageComponent> = {
  '/': HomeView,
  '/about': AboutView
}
