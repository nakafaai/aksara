import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Any two of the appliances together blow the fuse, so the kettle and the microwave oven never run together",
        },
        {
          correct: false,
          label:
            "The kettle with the toaster blows the fuse, the kettle with the microwave oven does not, and the cable then wastes about $$5\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "Only all three appliances together blow the fuse, and with the kettle and the microwave oven the cable wastes about $$63\\text{ W}$$",
        },
        {
          correct: true,
          label:
            "The kettle with the toaster blows the fuse, the kettle with the microwave oven does not, and the cable then wastes about $$63\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mana-mana dua perkakas bersama-sama meniupkan fius, jadi cerek dan ketuhar gelombang mikro tidak pernah digunakan bersama",
        },
        {
          correct: false,
          label:
            "Cerek bersama pembakar roti meniupkan fius, cerek bersama ketuhar gelombang mikro tidak, dan kabel kemudian membazirkan kira-kira $$5\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "Hanya ketiga-tiga perkakas bersama-sama meniupkan fius, dan dengan cerek serta ketuhar gelombang mikro kabel membazirkan kira-kira $$63\\text{ W}$$",
        },
        {
          correct: true,
          label:
            "Cerek bersama pembakar roti meniupkan fius, cerek bersama ketuhar gelombang mikro tidak, dan kabel kemudian membazirkan kira-kira $$63\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
