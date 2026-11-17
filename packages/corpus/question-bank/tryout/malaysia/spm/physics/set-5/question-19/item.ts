import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$ closer to the mirror, and $$45\\text{ cm}$$ from his eyes",
        },
        {
          correct: true,
          label:
            "$$30\\text{ cm}$$ further behind the mirror, and $$113\\text{ cm}$$ from his eyes",
        },
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$ further behind the mirror, and $$90\\text{ cm}$$ from his eyes",
        },
        {
          correct: false,
          label:
            "To $$150\\text{ cm}$$ in front of the mirror, and $$113\\text{ cm}$$ from his eyes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$ lebih dekat dengan cermin, dan $$45\\text{ cm}$$ dari matanya",
        },
        {
          correct: true,
          label:
            "$$30\\text{ cm}$$ lebih jauh di belakang cermin, dan $$113\\text{ cm}$$ dari matanya",
        },
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$ lebih jauh di belakang cermin, dan $$90\\text{ cm}$$ dari matanya",
        },
        {
          correct: false,
          label:
            "Ke $$150\\text{ cm}$$ di hadapan cermin, dan $$113\\text{ cm}$$ dari matanya",
        },
      ],
    },
  },
};

export default item;
