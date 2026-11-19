export const bandlagudaJagir = {
  name: 'Bandlaguda Jagir',
  path: '/service-areas/bandlaguda-jagir',
  telephone: '+919491173428',
  displayTelephone: '+91 94911 73428',
  whatsapp: `https://wa.me/919491173428?text=${encodeURIComponent('Hi Aravind Safety Nets, I’d like a quote for my property in Bandlaguda Jagir.')}`,
} as const;

export const bandlagudaPlace = {
  '@type': 'Place',
  name: bandlagudaJagir.name,
  containedInPlace: {
    '@type': 'City',
    name: 'Hyderabad',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Telangana',
      containedInPlace: { '@type': 'Country', name: 'India' },
    },
  },
};

export const bandlagudaServices = [
  {
    slug: 'invisible-grills',
    name: 'Invisible Grills & Window Safety Grills',
    linkLabel: 'Explore invisible grills',
    description: 'Considering invisible grill installation for a balcony or window? Slim cables provide a physical barrier while keeping the view relatively clear. Ask about cable spacing and a suitable mounting surface before choosing window safety grills.',
  },
  {
    slug: 'balcony-safety-nets',
    name: 'Balcony Safety Nets',
    linkLabel: 'Explore balcony safety nets',
    description: 'For an open balcony, the right solution depends on the size of the opening, available fixing points, and what you want to protect against. We can help you compare netting and invisible grills before you decide.',
  },
  {
    slug: 'pigeon-safety-nets',
    name: 'Pigeon Safety Nets & Bird Protection',
    linkLabel: 'Explore pigeon safety nets',
    description: 'If pigeons are roosting near your balcony, utility area, or AC ledge, bird protection nets can help keep them out. Share where birds enter and mention any openings that need to stay accessible for maintenance.',
  },
  {
    slug: 'children-safety-nets',
    name: 'Child Safety Nets',
    linkLabel: 'Explore child safety nets',
    description: 'Discuss child safety nets for accessible balcony and window openings, including gaps beside railings or walls. A fitted barrier is an extra precaution, not a substitute for adult supervision.',
  },
] as const;

export const bandlagudaFaqs = [
  {
    question: 'Do you install invisible grills in Bandlaguda Jagir apartments?',
    answer: 'Yes. We serve apartments and homes in Bandlaguda Jagir. Share photos of the balcony or window and let us know if your building has restrictions on drilling, exterior fittings, or installer access.',
  },
  {
    question: 'Should I choose an invisible grill or a balcony safety net?',
    answer: 'Start with the problem you want to solve. For pigeons, ask about bird netting and how the edges will be closed. For a balcony or window safety barrier, ask what can be securely mounted, how it will be spaced, and how it will affect access and the view.',
  },
  {
    question: 'Can bird protection netting be installed near an AC outdoor unit?',
    answer: 'It depends on the opening and where the net can be fixed. Mention the position of the unit when you get in touch so airflow and access for servicing can be considered before installation.',
  },
  {
    question: 'What should I send for a quote?',
    answer: 'Send your locality, a wide photo of each opening, and approximate width and height if you can measure safely from inside. Mention whether you need pigeon protection, child safety, or window grills. Pricing depends on the opening size, material, and installation access.',
  },
] as const;
