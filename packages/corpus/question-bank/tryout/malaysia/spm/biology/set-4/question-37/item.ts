import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "transport-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.4\\text{ g}$$ per hour, and $$0.6\\text{ g}$$ stayed in the shoot, for example to keep cells turgid and for photosynthesis",
        },
        {
          correct: true,
          label:
            "$$2.1\\text{ g}$$ per hour, and $$0.6\\text{ g}$$ stayed in the shoot, for example to keep cells turgid and for photosynthesis",
        },
        {
          correct: false,
          label:
            "$$4.2\\text{ g}$$ per hour, and $$0.6\\text{ g}$$ stayed in the shoot, for example to keep cells turgid and for photosynthesis",
        },
        {
          correct: false,
          label:
            "$$2.1\\text{ g}$$ per hour, and $$0.6\\text{ g}$$ evaporated from the open end of the capillary tube",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.4\\text{ g}$$ sejam, dan $$0.6\\text{ g}$$ kekal dalam pucuk, contohnya untuk mengekalkan kesegahan sel dan untuk fotosintesis",
        },
        {
          correct: true,
          label:
            "$$2.1\\text{ g}$$ sejam, dan $$0.6\\text{ g}$$ kekal dalam pucuk, contohnya untuk mengekalkan kesegahan sel dan untuk fotosintesis",
        },
        {
          correct: false,
          label:
            "$$4.2\\text{ g}$$ sejam, dan $$0.6\\text{ g}$$ kekal dalam pucuk, contohnya untuk mengekalkan kesegahan sel dan untuk fotosintesis",
        },
        {
          correct: false,
          label:
            "$$2.1\\text{ g}$$ sejam, dan $$0.6\\text{ g}$$ tersejat dari hujung terbuka tiub kapilari",
        },
      ],
    },
  },
};

export default item;
