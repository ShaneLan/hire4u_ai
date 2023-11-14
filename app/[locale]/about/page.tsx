import { Metadata } from 'next'
import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'

type Props = {
  params: { locale: any }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'about')
  return genPageMetadata({
    title: t('about'),
    params: { locale: locale },
  })
}

export default async function Page({ params: { locale } }: Props) {
  const { t } = await createTranslation(locale, 'about')
  const author = allAuthors.find((a) => a.default === true && a.language === locale) as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent} t={t}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}