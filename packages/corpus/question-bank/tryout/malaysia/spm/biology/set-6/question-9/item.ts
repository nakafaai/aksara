import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "nutrition-and-the-human-digestive-system",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About $$280\\text{ m}^2$$, and about $$10\\%$$ of it is lost",
        },
        {
          correct: false,
          label: "About $$16\\text{ m}^2$$, and about $$30\\%$$ of it is lost",
        },
        {
          correct: false,
          label: "About $$94\\text{ m}^2$$, and about $$90\\%$$ of it is lost",
        },
        {
          correct: true,
          label: "About $$280\\text{ m}^2$$, and about $$90\\%$$ of it is lost",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kira-kira $$280\\text{ m}^2$$, dan kira-kira $$10\\%$$ daripadanya hilang",
        },
        {
          correct: false,
          label:
            "Kira-kira $$16\\text{ m}^2$$, dan kira-kira $$30\\%$$ daripadanya hilang",
        },
        {
          correct: false,
          label:
            "Kira-kira $$94\\text{ m}^2$$, dan kira-kira $$90\\%$$ daripadanya hilang",
        },
        {
          correct: true,
          label:
            "Kira-kira $$280\\text{ m}^2$$, dan kira-kira $$90\\%$$ daripadanya hilang",
        },
      ],
    },
  },
};

export default item;
