import Image from "next/image";

export const metadata = {
  title: "Under Maintenance | Rooh",
  robots: {
    index: false,
    follow: false,
  },
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.139-1.633-.807-1.887-.899-.254-.093-.439-.139-.624.139-.185.278-.715.899-.877 1.085-.161.185-.323.208-.6.069-.297-.139-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.139-.624-1.504-.855-2.061-.225-.541-.451-.468-.624-.477-.161-.008-.347-.01-.533-.01-.186 0-.486.069-.74.347-.254.278-.97.949-.97 2.316 0 1.367.994 2.688 1.132 2.875.139.186 2.335 3.564 5.657 4.997.787.339 1.4.429 1.88.26.572-.192 1.558-.715 1.778-1.406.218-.691.218-1.283.152-1.406-.066-.122-.242-.198-.51-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </svg>
  );
}

export default function MaintenancePage() {
  const phoneDisplay = "+968 76429013";
  const phoneHref = "tel:+96876429013";
  const whatsappHref =
    "https://wa.me/96876429013?text=" +
    encodeURIComponent("Hi! I have a query about Rooh.");

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-[var(--color-secondary-50)]">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-14 sm:mb-16">
          <div className="relative h-20 w-64 sm:h-24 sm:w-80 overflow-hidden">
            <Image
              src="/ROOH LOGO.png"
              alt="Rooh"
              width={2480}
              height={3508}
              className="absolute left-1/2 top-1/2 h-[320%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
              priority
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-medium text-[var(--color-neutral-800)] mb-3">
          Under Maintenance
        </h1>

        <p className="text-[var(--color-neutral-600)] text-base leading-relaxed mb-8 max-w-sm mx-auto">
          We&apos;re updating the site and will be back soon. For any queries,
          please call or message us.
        </p>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 rounded-md bg-[#25D366] hover:bg-[#1ebe57] text-white px-7 py-3.5 text-base transition-colors"
        >
          <WhatsAppIcon className="h-6 w-6 shrink-0" />
          <span>{phoneDisplay}</span>
        </a>

        <p className="mt-4 text-sm text-[var(--color-neutral-500)]">
          Or call{" "}
          <a href={phoneHref} className="underline hover:theme-text-primary">
            {phoneDisplay}
          </a>
        </p>
      </div>
    </main>
  );
}
