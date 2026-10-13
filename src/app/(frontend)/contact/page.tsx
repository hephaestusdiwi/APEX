import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
    return (
        <section className="mx-auto w-full max-w-7xl px-5 pt-28 md:px-10 md:pt-36">
            <h1 className="text-[clamp(2rem,3.4vw,3.75rem)] font-medium leading-[1.1]  tracking-light">Contact</h1>
            <div className="mt-12 max-w-xl md:mt-16">
                <ContactForm />
            </div>
        </section>
    )
}