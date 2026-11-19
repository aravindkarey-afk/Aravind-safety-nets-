import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "ctaCall": z.string(),
        "ctaWhatsApp": z.string(),
        "ctaQuote": z.string()
      }),
      "trustBadges": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      })),
      "services": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "name": z.string(),
          "description": z.string(),
          "featured": z.boolean()
        }))
      }),
      "about": z.object({
        "heading": z.string(),
        "body": z.string(),
        "highlights": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "whyUs": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "contact": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "phone": z.string(),
        "email": z.string(),
        "location": z.string()
      })
    }),
    gallery: z.object({
      "heading": z.string(),
      "subheading": z.string(),
      "categories": z.array(z.object({
        "id": z.string(),
        "label": z.string()
      })),
      "items": z.array(z.object({
        "id": z.string(),
        "slot": z.string(),
        "alt": z.string(),
        "category": z.string(),
        "caption": z.string()
      })),
      "cta": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "phone": z.string()
      })
    }),
    contact: z.object({
      "hero": z.object({
        "heading": z.string(),
        "subheading": z.string()
      }),
      "contactDetails": z.object({
        "phone": z.string(),
        "whatsapp": z.string(),
        "email": z.string(),
        "address": z.string(),
        "hours": z.string(),
        "serviceArea": z.string()
      }),
      "form": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "successMessage": z.string(),
        "fields": z.object({
          "namePlaceholder": z.string(),
          "emailPlaceholder": z.string(),
          "phonePlaceholder": z.string(),
          "servicePlaceholder": z.string(),
          "messagePlaceholder": z.string()
        })
      }),
      "mapEmbedUrl": z.string(),
      "faq": z.object({
        "heading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "question": z.string(),
          "answer": z.string()
        }))
      })
    }),
    thank_you: z.object({
      "heading": z.string(),
      "subheading": z.string(),
      "body": z.string(),
      "fasterResponseLabel": z.string(),
      "callLabel": z.string(),
      "whatsappLabel": z.string(),
      "backHomeLabel": z.string(),
      "viewServicesLabel": z.string()
    }),
    about: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "heading": z.string(),
        "subheading": z.string()
      }),
      "story": z.object({
        "heading": z.string(),
        "paragraphs": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "stats": z.array(z.object({
        "id": z.string(),
        "value": z.string(),
        "label": z.string()
      })),
      "mission": z.object({
        "heading": z.string(),
        "statement": z.string(),
        "values": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "founder": z.object({
        "heading": z.string(),
        "name": z.string(),
        "role": z.string(),
        "bio": z.string()
      }),
      "whyUs": z.object({
        "heading": z.string(),
        "points": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "serviceArea": z.object({
        "heading": z.string(),
        "description": z.string(),
        "localities": z.array(z.object({
          "id": z.string(),
          "name": z.string()
        }))
      }),
      "quality": z.object({
        "heading": z.string(),
        "points": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "cta": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "buttonPrimary": z.string(),
        "buttonSecondary": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;