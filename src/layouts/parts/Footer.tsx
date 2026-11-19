import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <img
              src="/airo-assets/images/logo/horizontal"
              alt="Aravind Safety Nets"
              className="block h-auto max-h-10 w-auto max-w-[180px] object-contain mb-4"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Hyderabad's trusted safety net and invisible grill installation specialists. Protecting homes and families since day one.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-accent">Quick Links</h3>
            <nav aria-label="Footer links">
              <ul className="flex flex-col gap-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/#services' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Why Choose Us', href: '/#why-us' },
                  { label: 'Contact', href: '/#contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-accent text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-accent">Contact Us</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:9491173428"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-accent" />
                  <span>9491173428</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:aravindsafetynets@gmail.com"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-accent" />
                  <span className="min-w-0 [overflow-wrap:anywhere]">aravindsafetynets@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="w-4 h-4 shrink-0 text-accent" />
                <span>Hyderabad, Telangana</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground/50 text-sm">
            © 2026 Aravind Safety Nets. All rights reserved.
          </p>
          <a
            href="https://wa.me/919491173428?text=Hello%20Aravind%20Safety%20Nets%2C%20I%20would%20like%20a%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/50 hover:text-accent text-sm transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </footer>
  );
}
