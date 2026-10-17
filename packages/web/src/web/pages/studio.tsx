import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Eye,
  Feather,
  Flower2,
  Footprints,
  Hand,
  Instagram,
  Leaf,
  MapPin,
  Scissors,
  Sparkles,
  Star,
  Waves,
} from "lucide-react";
import { Booking, Header, ImageModal, Logo, Reveal } from "../components/studio-ui";
import {
  address,
  categories,
  days,
  images,
  links,
  mapEmbed,
  mapsLink,
  navigation,
  reviews,
  services,
  type StudioImage,
} from "../data/studio";

const serviceIcons = {
  scissors: Scissors,
  leaf: Leaf,
  waves: Waves,
  sparkles: Sparkles,
  eye: Eye,
  hand: Hand,
  foot: Footprints,
  feather: Feather,
  flower: Flower2,
};
const gallery = [
  images.blonde,
  images.care,
  images.nails,
  images.bride,
  images.detail,
  images.studio,
];

function Services() {
  const [category, setCategory] = useState(0);
  const shown = services.filter((s) => category === 0 || s.category === category);
  return (
    <section id="servicos" className="services section">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">BELEZA, POR INTEIRO</p>
            <h2>
              Cuidado completo,
              <br />
              <em>beleza em cada detalhe.</em>
            </h2>
          </div>
          <p className="heading-description">
            Descubra os serviços disponíveis
            <br />
            no Sarah Studio.
          </p>
        </Reveal>
        <Reveal>
          <fieldset className="category-tabs" aria-label="Filtrar serviços">
            {categories.map((c, i) => (
              <button
                key={c}
                className={category === i ? "selected" : ""}
                aria-pressed={category === i}
                onClick={() => setCategory(i)}
              >
                {c}
              </button>
            ))}
          </fieldset>
          <div className="service-grid" aria-live="polite">
            {shown.map((s, i) => {
              const Icon = serviceIcons[s.icon as keyof typeof serviceIcons];
              return (
                <a
                  key={s.name}
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-item"
                  aria-label={`Agendar ${s.name} pelo WhatsApp`}
                >
                  <Icon size={24} strokeWidth={1.2} />
                  <span>{s.name}</span>
                  <ArrowUpRight size={15} className="service-arrow" />
                  <small>{String(i + 1).padStart(2, "0")}</small>
                </a>
              );
            })}
          </div>
          <div className="service-bottom">
            <span>Seu cuidado começa com uma conversa.</span>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Agende seu atendimento <ArrowUpRight size={17} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function Reviews() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(3);
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setCount(window.innerWidth < 700 ? 1 : window.innerWidth < 1100 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const max = reviews.length - count;
  useEffect(() => {
    setIndex((i) => Math.min(i, max));
  }, [max]);
  return (
    <section id="avaliacoes" className="reviews section">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">HISTÓRIAS DE CUIDADO</p>
            <h2>
              A confiança de quem
              <br />
              <em>já viveu a experiência.</em>
            </h2>
          </div>
          <p className="heading-description">
            Cada detalhe importa. E nada nos deixa mais felizes do que saber que você se sente bem
            cuidada.
          </p>
        </Reveal>
        <Reveal>
          <section
            className="reviews-viewport"
            aria-roledescription="carrossel"
            aria-label="Avaliações de clientes"
          >
            <motion.div
              className="review-track"
              animate={{ x: `-${(index * 100) / count}%` }}
              transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {reviews.map((r, i) => (
                <div
                  className="review-slide"
                  key={r.name}
                  aria-hidden={i < index || i >= index + count}
                >
                  <article
                    className={`review-card ${i === index + Math.floor(count / 2) ? "featured" : ""}`}
                  >
                    <div className="stars" aria-label="5 de 5 estrelas">
                      {Array.from({ length: 5 }, (_, n) => (
                        <Star key={n} size={14} fill="currentColor" strokeWidth={1} />
                      ))}
                    </div>
                    <blockquote>{r.text}</blockquote>
                    <div className="review-author">
                      <span className="avatar">
                        {r.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <div>
                        <h3>{r.name}</h3>
                        <span>Cliente do studio</span>
                      </div>
                      <span className="quote-mark" aria-hidden="true">
                        ”
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </motion.div>
          </section>
          <div className="review-controls">
            <span className="review-position" aria-live="polite">
              {String(index + 1).padStart(2, "0")}{" "}
              <span>/ {String(reviews.length).padStart(2, "0")}</span>
            </span>
            <div className="review-dots">
              {Array.from({ length: max + 1 }, (_, i) => (
                <button
                  key={i}
                  className={index === i ? "active" : ""}
                  aria-label={`Mostrar avaliações a partir de ${reviews[i].name}`}
                  aria-current={index === i ? "true" : undefined}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <div className="arrow-controls">
              <button
                aria-label="Avaliações anteriores"
                disabled={index === 0}
                onClick={() => setIndex((i) => i - 1)}
              >
                <ArrowLeft size={20} />
              </button>
              <button
                aria-label="Próximas avaliações"
                disabled={index === max}
                onClick={() => setIndex((i) => i + 1)}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function Location() {
  const [today, setToday] = useState<string>("");
  useEffect(() => {
    const update = () =>
      setToday(
        new Intl.DateTimeFormat("pt-BR", { weekday: "long", timeZone: "America/Sao_Paulo" }).format(
          new Date(),
        ),
      );
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section id="localizacao" className="location section">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">SEU MOMENTO, NO GONZAGA</p>
            <h2>
              Estamos esperando
              <br />
              <em>por você.</em>
            </h2>
          </div>
          <p className="heading-description">
            Venha conhecer o<br />
            Sarah Studio de Beleza.
          </p>
        </Reveal>
        <div className="location-grid">
          <Reveal className="map-area">
            <div className="map-frame">
              <iframe
                title="Localização do Sarah Studio de Beleza no Google Maps"
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="address-row">
              <MapPin size={22} />
              <p>{address}.</p>
              <a className="text-link" href={mapsLink} target="_blank" rel="noopener noreferrer">
                Como chegar <ArrowUpRight size={17} />
              </a>
            </div>
          </Reveal>
          <Reveal className="hours" delay={0.12}>
            <Clock3 size={25} strokeWidth={1.2} />
            <h3>Horário de funcionamento</h3>
            <p className="hours-note">Um tempo reservado para você.</p>
            <dl>
              {[1, 2, 3, 4, 5, 6, 0].map((i) => (
                <div className={today === days[i].toLowerCase() ? "today" : ""} key={i}>
                  <dt>
                    {days[i]}
                    {today === days[i].toLowerCase() && <span>Hoje</span>}
                  </dt>
                  <dd>{i === 0 || i === 1 ? "Fechado" : "09:00–19:00"}</dd>
                </div>
              ))}
            </dl>
            <Booking>Reserve seu horário</Booking>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
export default function StudioPage() {
  const [lightbox, setLightbox] = useState<StudioImage | null>(null);
  const close = useCallback(() => setLightbox(null), []);
  const hero = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <section id="inicio" ref={hero} className="hero">
          <motion.div className="hero-image" style={{ y: reduced ? 0 : y }}>
            <img
              src="/images/hero-section.jpg"
            />
          </motion.div>
          <div className="hero-overlay" />
          <div className="container hero-content">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.12 }}
            >
              <p className="eyebrow hero-eyebrow">
                <span /> A ESSÊNCIA DA SUA BELEZA
              </p>
              <h1>
                Beleza que revela
                <br />a sua <em>melhor</em>
                <br />
                <em>versão.</em>
              </h1>
              <p className="hero-subtitle">Referência em Loiros Sofisticados em Santos/SP</p>
              <p className="hero-description">
                Cabelo tratado e saudável.
                <br />
                Serviços e tratamentos exclusivos.
              </p>
              <div className="hero-buttons">
                <Booking />
                <a href="#studio" className="button secondary">
                  Conheça nosso studio <ArrowUpRight size={17} />
                </a>
              </div>
            </motion.div>
          </div>
          <div className="hero-bottom container">
            <a href="#studio" className="scroll-hint">
              <ArrowDown size={15} />
              <span>DESCUBRA O SARAH STUDIO</span>
            </a>
            <span className="hero-location">
              <MapPin size={13} /> GONZAGA · SANTOS/SP
            </span>
            <span className="photo-note"></span>
          </div>
        </section>
        <section id="studio" className="about section">
          <div className="container about-grid">
            <Reveal className="about-photos">
              <button
                className="photo photo-main"
                
                aria-label="Ampliar fotografia ilustrativa de salão"
              >
                <img
                  src="/images/resultado2.jpg"
                  
                />
              </button>
              <button
                className="photo photo-small"
                
                aria-label="Ampliar fotografia ilustrativa de cuidado capilar"
              >
                <img
                  src="/images/salao2.jpg"
                />
              </button>
              <button
                className="photo photo-detail"
              
                aria-label="Ampliar fotografia ilustrativa de cabelo loiro"
              >
                <img
                  src="/images/resultado1.jpg"
                  alt={images.blonde.alt}
                  loading="lazy"
                  width="900"
                  height="1200"
                />
              </button>
              <span className="photo-outline" aria-hidden="true" />
              <p className="gallery-note">
                UM UNIVERSO DE CUIDADO
              </p>
            </Reveal>
            <Reveal className="about-copy" delay={0.15}>
              <p className="eyebrow">SARAH STUDIO DE BELEZA</p>
              <h2>
                Um espaço dedicado
                <br />à sua beleza
                <br />
                <em>e bem-estar.</em>
              </h2>
              <span className="gold-rule" />
              <p className="body-copy">
                Uma experiência de cuidado que une profissionais qualificados, técnicas atualizadas
                e atenção a cada detalhe. Do cabelo aos cuidados pessoais, cada atendimento é
                pensado para valorizar a sua beleza com qualidade, conforto e sofisticação.
              </p>
              <ul className="about-values">
                {[
                  "Cuidado em cada detalhe.",
                  "Profissionais especializados.",
                  "Beleza com saúde e qualidade.",
                ].map((text) => (
                  <li key={text}>
                    <Check size={15} strokeWidth={1.5} />
                    {text}
                  </li>
                ))}
              </ul>
              <a
                href={links.whatsapp}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Viva essa experiência <ArrowUpRight size={18} />
              </a>
            </Reveal>
          </div>
        </section>
        <Services />
        <section className="marquee-section">
          <div className="container marquee-heading">
            <p className="eyebrow">A BELEZA ESTÁ NOS DETALHES</p>
            <span>Inspirações de beleza </span>
          </div>
          <div className="marquee-container">
            <div className="marquee-track">
              {[0, 1].map((group) => (
                <div
                  className="marquee-group"
                  key={group}
                  aria-hidden={group === 1 ? true : undefined}
                >
                  {gallery.map((image, i) => (
                    <button
                      key={image.src}
                      className="marquee-image"
                      tabIndex={group === 1 ? -1 : 0}
                      onClick={() => setLightbox(image)}
                      aria-label={`Ampliar inspiração: ${image.alt}`}
                    >
                      <img
                        src={image.src} 
                        alt={group === 1 ? "" : image.alt}
                        loading="lazy"
                        width="600"
                        height="750"
                      />
                      <span>
                        0{i + 1} <ArrowUpRight size={16} />
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
        <Reviews />
        <Location />
        <section className="final-cta">
          <Reveal className="container">
            <Flower2 size={40} strokeWidth={0.8} className="cta-flower" />
            <p className="eyebrow">UM CONVITE PARA SE CUIDAR</p>
            <h2>
              Seu próximo momento de cuidado
              <br />
              <em>começa aqui.</em>
            </h2>
            <p>Reserve seu horário e descubra uma experiência de beleza pensada para você.</p>
            <Booking>Agendar pelo WhatsApp</Booking>
          </Reveal>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Logo />
              <p>
                Beleza, cuidado e sofisticação
                <br />
                em cada detalhe.
              </p>
            </div>
            <nav aria-label="Navegação do rodapé">
              <p className="eyebrow">EXPLORE</p>
              {navigation.slice(1).map(([name, href]) => (
                <a href={href} key={href}>
                  {name}
                </a>
              ))}
            </nav>
            <div className="footer-contact">
              <p className="eyebrow">ENCONTRE O STUDIO</p>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer">
                Praça Fernandes Pacheco, 14
                <br />
                Gonzaga, Santos/SP <ArrowUpRight size={14} />
              </a>
              <div className="footer-socials">
                <a href={links.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={17} />
                  Instagram
                </a>
                <a href={links.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook <ArrowUpRight size={14} />
                </a>
              </div>
              <a
                className="text-link"
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agende pelo WhatsApp <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Sarah Studio de Beleza. Todos os direitos reservados.
            </span>
            <a href="#inicio">
              Voltar ao topo <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </footer>
      <ImageModal image={lightbox} onClose={close} />
    </>
  );
}
