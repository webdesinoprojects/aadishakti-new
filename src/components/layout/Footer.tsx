import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-heading font-bold text-2xl uppercase tracking-wider text-white">
                Aadishakti
              </span>
            </Link>
            <p className="text-brand-steel text-sm leading-relaxed max-w-xs">
              A leading Indian industrial company specializing in lead recycling and non-ferrous metal manufacturing with a global footprint and 30 years of excellence.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg text-white mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Products', 'Import', "Investor's Corner", 'Careers'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/[' ]/g, '')}`} className="text-brand-steel hover:text-brand-amber transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg text-white mb-6 uppercase tracking-wider">Our Products</h4>
            <ul className="space-y-3 text-sm text-brand-steel">
              <li><Link href="/products/refined-lead" className="hover:text-brand-amber transition-colors">Refined/Pure Lead Ingots</Link></li>
              <li><Link href="/products/lead-alloys" className="hover:text-brand-amber transition-colors">Lead Alloys</Link></li>
              <li><Link href="/products/red-lead-oxide" className="hover:text-brand-amber transition-colors">Red Lead Oxide</Link></li>
              <li><Link href="/products/grey-lead-oxide" className="hover:text-brand-amber transition-colors">Grey Lead Oxide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg text-white mb-6 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-sm text-brand-steel">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" />
                <span>30, Shivaji Marg, Moti Nagar, New Delhi – 110015, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-amber shrink-0" />
                <span>+91-8743000299, 8743000799</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-amber shrink-0" />
                <span>marketing@aadishakti.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-brand-steel">
          <p>© {new Date().getFullYear()} Aadishakti. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-brand-amber transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-amber transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
