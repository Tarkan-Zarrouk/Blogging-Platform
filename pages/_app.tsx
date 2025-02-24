import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextRouter, useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { ToastProvider } from "@heroui/react";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<NextRouter["push"]>[2]>;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const useHref = (href: string) => router.basePath + href;

  return (
    <HeroUIProvider navigate={router.push} useHref={useHref}>
      <NextThemesProvider>
        <ToastProvider />
        <Component {...pageProps} />
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
