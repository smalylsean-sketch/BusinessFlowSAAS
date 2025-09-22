// components/Sidebar.js
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Invoicing', href: '/invoicing', icon: '🧾' },
  { name: 'Payroll', href: '/payroll', icon: '💰' },
  { name: 'Reports', href: '/reports', icon: '📈' },
  { name: 'Wallets', href: '/wallets', icon: '💳' },
  { name: 'Team', href: '/team', icon: '👥' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const router = useRouter()

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <div className="h-8 w-auto text-white text-xl font-bold">BusinessFlow</div>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          router.pathname === item.href
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <span className="mr-4">{item.icon}</span>
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex bg-gray-700 p-4">
                <div className="flex items-center">
                  <div>
                    <div className="text-base font-medium text-white">Jane Cooper</div>
                    <div className="text-sm font-medium text-gray-300">jane@businessflow.com</div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="h-8 w-auto text-white text-xl font-bold">BusinessFlow</div>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={classNames(
                      router.pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex bg-gray-700 p-4">
            <div className="flex items-center">
              <div>
                <div className="text-base font-medium text-white">Jane Cooper</div>
                <div className="text-sm font-medium text-gray-300">jane@businessflow.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}