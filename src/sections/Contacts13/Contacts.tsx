import Link from 'next/link'
import { navigation } from 'lib/utils'

const data = {
  address: 'Москва, университет',
  phone: '+7 (999) 999 99 99',
  mail: 'alina@alina.com',
  schedule: '9:00 - 00:00',
  socials: {
    vk: 'https://vk.com/',
    telegram: 'https://telegram.com/',
    instagram: 'https://instagram.com/',
  },
}

const Contacts = () => {
  const { mail, phone, address, schedule, socials } = data
  return navigation.contacts ? (
    <section
      id={navigation.contacts}
      className={'bg-site-accent text-site-accent-text'}
    >
      <div className={'container-max-width grid p-10'}>
        <h2 className={'text-2xl font-semibold pb-5'}>Контакты</h2>
        <div className="text-sm space-y-2 grid grid-cols-3 gap-1">
          <p className={'m-0'}>
            <strong>Адрес:</strong> {address}
          </p>
          <p className={'m-0'}>
            <strong>Телефон:</strong>{' '}
            <Link
              href={`tel:${phone}`}
              className="text-blue-600 hover:underline"
            >
              {phone}
            </Link>
          </p>
          <p className={'m-0'}>
            <strong>Email:</strong>{' '}
            <Link
              href={`mailto:${mail}`}
              className="text-blue-600 hover:underline"
            >
              {mail}
            </Link>
          </p>
          <p className={'m-0'}>
            <strong>График работы:</strong> {schedule}
          </p>
          <div>
            {Object.keys(socials).length > 0 && (
              <div className="space-x-4">
                {socials.vk && (
                  <Link
                    href={socials.vk}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    VK
                  </Link>
                )}
                {socials.telegram && (
                  <Link
                    href={socials.telegram}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    Telegram
                  </Link>
                )}
                {socials.instagram && (
                  <Link
                    href={socials.instagram}
                    target="_blank"
                    className="text-pink-500 hover:underline"
                  >
                    Instagram
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  ) : null
}

export default Contacts
