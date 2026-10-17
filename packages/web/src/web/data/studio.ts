export const links = {
  whatsapp: "https://api.whatsapp.com/message/BV3YWN5JK76JK1?autoload=1&app_absent=0&utm_source=ig",
  instagram: "https://www.instagram.com/sarahstudiosantos/",
  facebook: "https://www.facebook.com/sarahstudiosantos",
};
export const address = "Praça Fernandes Pacheco, 14 — Gonzaga, Santos — SP, 11060-410";
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
export const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
export const images = {
  hero: {
    src: "/images/resultado4.jpg",
    alt: "Mulher lavando o cabelo",
  },
  studio: {
    src: "/images/salao2.jpg",
    alt: "Foto do salão",
  },
  care: {
    src: "/images/experiencia1.jpg",
    alt: "Fotografia ilustrativa de cuidado capilar em um lavatório",
  },
  blonde: {
    src: "/images/resultado2.jpg",
    alt: "Fotografia ilustrativa de cabelos loiros longos e ondulados",
  },
  nails: {
    src: "/images/salao3.jpg",
    alt: "Fotografia ilustrativa de uma manicure com esmalte nude",
  },
  bride: {
    src: "/images/resultado1.jpg",
    alt: "Fotografia ilustrativa de penteado de noiva com acessório delicado",
  },
  detail: {
    src: "/images/salao1.jpg",
    alt: "Fotografia ilustrativa de cabelos loiros em movimento",
  },
};
export type StudioImage = { src: string; alt: string };
export const categories = [
  "Todos os serviços",
  "Cabelo",
  "Beleza e estética",
  "Mãos e pés",
  "Depilação e cuidados masculinos",
  "Ocasiões especiais",
];
export const services = [
  { name: "Cabelo", category: 1, icon: "scissors" },
  { name: "Terapia Capilar", category: 1, icon: "leaf" },
  { name: "Mega Hair", category: 1, icon: "waves" },
  { name: "Cabelo — Penteados", category: 1, icon: "sparkles" },
  { name: "Estética — Cílios", category: 2, icon: "eye" },
  { name: "Sobrancelha", category: 2, icon: "eye" },
  { name: "Maquiagem", category: 2, icon: "sparkles" },
  { name: "Mãos e Pés", category: 3, icon: "hand" },
  { name: "Mãos e Pés — Unhas Artificiais", category: 3, icon: "hand" },
  { name: "Podologia", category: 3, icon: "foot" },
  { name: "Depilação", category: 4, icon: "feather" },
  { name: "Depilação Masculina", category: 4, icon: "feather" },
  { name: "Barba e Bigode", category: 4, icon: "scissors" },
  { name: "Dia da Noiva", category: 5, icon: "flower" },
];
export const reviews = [
  {
    name: "Acacio Santos",
    text: "Sou fã incondicional da podóloga Márcia Santos que atende neste local. Super atenciosa, educada, acolhedora, gentil, excelente profissional, mãos delicadas no trato com meus pés e fortemente atualizada em estudos e tratamentos do seu ofício.\n\nSuper recomendo! 👏👏👏",
  },
  {
    name: "Luanna Diogo",
    text: "Michelle e o Fabio são incríveis! Não confio meu cabelo com mais ninguém além deles! Corte, mechas, tratamento, em tudo são impecáveis e super profissionais no que fazem! A equipe do salão também é maravilhosa, não troco por nada!",
  },
  {
    name: "Fabricio",
    text: "Local extremamente limpo, organizado, com profissionais super atenciosos. No meu caso, procurei uma podologa muito boa que atende lá e fiquei impressionado com a pontualidade. Acredito que pelo nível do espaço, todos os outros profissionais tenham o mesmo perfil.",
  },
  {
    name: "Ayla Vieira",
    text: "Tudo maravilhoso da recepção até o pós atendimento. Equipe qualificada e disposta a fazer o melhor com responsabilidade e muuuita qualidade.\n\nNão troco mais. Ah e tem manobrista! 😍",
  },
  {
    name: "Talita Alonso",
    text: "Tudo o que há de mais atual com os cuidados que o seu cabelo merece. A qualidade do serviço e o conforto do lugar são ótimos. Ótimos profissionais. Confio de olhos fechados.",
  },
];
export const days = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
export const navigation = [
  ["Início", "#inicio"],
  ["O Studio", "#studio"],
  ["Serviços", "#servicos"],
  ["Avaliações", "#avaliacoes"],
  ["Localização", "#localizacao"],
];
