import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Instagram, Menu, X } from "lucide-react";
import { links, navigation, type StudioImage } from "../data/studio";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function Booking({
  children = "Agendar horário",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`button primary ${className}`}
      href={links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#inicio" className={`brand ${className}`} aria-label="Sarah Studio de Beleza — início">
      <img src="/images/logo.png" alt="Sarah Studio de beleza · Barber" width="565" height="296" />
    </a>
  );
}
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [
          button.current,
          ...Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1001px)");
    const close = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);
  return (
    <header className={`header ${scrolled || open ? "solid" : ""}`}>
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="social-link"
            href={links.instagram}
            aria-label="Instagram oficial do Sarah Studio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={19} />
          </a>
          <Booking className="header-cta-pulse" />
          <button
            ref={button}
            className="menu-toggle"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            ref={panel}
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Navegação no celular"
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navigation.map(([label, href], i) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                <span>0{i + 1}</span>
                {label}
                <ArrowUpRight size={20} />
              </a>
            ))}
            <Booking />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
export function ImageModal({ image, onClose }: { image: StudioImage | null; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!image) return;
    const prior = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault();
        close.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      prior?.focus();
    };
  }, [image, onClose]);
  return (
    <AnimatePresence>
      {image && (
        <motion.dialog
          open
          className="lightbox"
          aria-modal="true"
          aria-label="Fotografia ilustrativa ampliada"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            ref={close}
            className="lightbox-close"
            onClick={onClose}
            aria-label="Fechar fotografia"
          >
            <X />
          </button>
          <figure>
            <img src={image.src} alt={image.alt} />
            <figcaption>
              
            </figcaption>
          </figure>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
}
