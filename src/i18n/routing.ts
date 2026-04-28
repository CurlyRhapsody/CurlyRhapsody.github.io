import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from './config';
import { createNavigation } from 'next-intl/navigation';
 
export const routing = defineRouting({
    locales,
    defaultLocale,
    localePrefix: 'as-needed' 
});

export const {
    Link: LocaleLink,
    redirect: localeRedirect,
    usePathname: useLocalePathname,
    useRouter: useLocaleRouter
} = createNavigation(routing);