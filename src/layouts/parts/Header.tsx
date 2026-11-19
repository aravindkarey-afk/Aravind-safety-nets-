import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';

const serviceLinks = [
  { label: 'Pigeon Safety Nets', href: '/services/pigeon-safety-nets' },
  { label: 'Children Safety Nets', href: '/services/children-safety-nets' },
  { label: 'Invisible Grills', href: '/services/invisible-grills' },
  { label: 'Balcony Safety Nets', href: '/services/balcony-safety-nets' },
  { label: 'Duct Area Nets', href: '/services/duct-area-nets' },
  { label: 'Monkey Safety Nets', href: '/services/monkey-safety-nets' },
  { label: 'Cloth Hangers', href: '/services/cloth-hangers' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary shadow-lg' : 'bg-primary'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/airo-assets/images/logo/horizontal"
              alt="Aravind Safety Nets"
              className="block h-auto max-h-10 md:max-h-12 w-auto max-w-[200px] object-contain self-center"
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/"
              className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors duration-200"
            >
              Home
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                to="/services"
                className="flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors duration-200"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </Link>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-accent transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/gallery"
              className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors duration-200"
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:9491173428"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10">
          <nav aria-label="Mobile navigation" className="px-4 py-4 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground text-base font-medium py-2.5 border-b border-primary-foreground/10 transition-colors"
            >
              Home
            </Link>

            {/* Mobile Services accordion */}
            <div className="border-b border-primary-foreground/10">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between text-primary-foreground/80 hover:text-primary-foreground text-base font-medium py-2.5 transition-colors"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pb-2 flex flex-col gap-1 pl-3">
                  <Link
                    to="/services"
                    onClick={() => setMobileOpen(false)}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium py-1.5 transition-colors"
                  >
                    All Services
                  </Link>
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium py-1.5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/gallery"
              onClick={() => setMobileOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground text-base font-medium py-2.5 border-b border-primary-foreground/10 transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground text-base font-medium py-2.5 border-b border-primary-foreground/10 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground text-base font-medium py-2.5 border-b border-primary-foreground/10 transition-colors"
            >
              Contact
            </Link>
            <a
              href="tel:9491173428"
              className="flex items-center justify-center gap-2 bg-accent text-white px-4 py-3 rounded-lg text-base font-semibold mt-3"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now: 9491173428</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
