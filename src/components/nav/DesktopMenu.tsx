import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '@/config/nav';

export const DesktopMenu: React.FC = () => {
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className={`relative py-2 text-[13px] font-medium uppercase tracking-[0.2em] transition-colors hover:text-[#C5A572] ${
                isActive(link.href)
                  ? 'text-[#C5A572]'
                  : 'text-neutral-700'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C5A572]" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
