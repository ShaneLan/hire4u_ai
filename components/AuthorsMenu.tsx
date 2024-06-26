'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Authors, allAuthors } from 'contentlayer/generated'
import { Fragment, useRef, useState } from 'react'
import { Menu, RadioGroup, Transition } from '@headlessui/react'
import { useOuterClick } from './util/useOuterClick'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

type AuthorsMenuProps = {
  className: string
}

const AuthorsMenu = ({ className }: AuthorsMenuProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')
  const authors = allAuthors
    .filter((a) => a.language === locale)
    .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1)) as Authors[]

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, closeMenu)

  return (
    <div ref={menubarRef} className={className}>
      <Menu as="div" className="relative inline-block text-left leading-5">
        <div>
          <Menu.Button onClick={toggleMenu}>{t('about')}</Menu.Button>
        </div>
        <Transition
          as={Fragment}
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute right-0 z-50 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
            as="div"
          >
            <RadioGroup>
              <div className="p-1">
                {authors.map((author) => {
                  const { name, avatar, language, slug } = author
                  if (language === locale) {
                    return (
                      <RadioGroup.Option key={name} value={name}>
                        <Menu.Item>
                          <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm">
                            <div className="mr-2">
                              <Image
                                className="rounded-full"
                                src={avatar ?? ''}
                                alt=""
                                width={25}
                                height={25}
                              />
                            </div>
                            <Link
                              href={`/${slug}`}
                              onClick={closeMenu}
                              className="hover:text-primary-500 dark:hover:text-primary-500"
                            >
                              {name}
                            </Link>
                          </button>
                        </Menu.Item>
                      </RadioGroup.Option>
                    )
                  }
                  return null // Return null if the language doesn't match the locale
                })}
              </div>
            </RadioGroup>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default AuthorsMenu
