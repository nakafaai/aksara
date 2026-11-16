import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Within the limit at about $$455\\text{ mg}$$ per kg, about $$2.0$$ cans for the adult, and one can keeps the child under the daily intake",
        },
        {
          correct: false,
          label:
            "Within the limit at about $$385\\text{ mg}$$ per kg, about $$2.0$$ cans for the adult, and one can puts the child over the daily intake",
        },
        {
          correct: false,
          label:
            "Within the limit at about $$127\\text{ mg}$$ per kg, about $$2.4$$ cans for the adult, and one can keeps the child under the daily intake",
        },
        {
          correct: true,
          label:
            "Within the limit at about $$385\\text{ mg}$$ per kg, about $$2.4$$ cans for the adult, and one can puts the child over the daily intake",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dalam had pada kira-kira $$455\\text{ mg}$$ per kg, kira-kira $$2.0$$ tin bagi orang dewasa, dan satu tin mengekalkan kanak-kanak di bawah pengambilan harian",
        },
        {
          correct: false,
          label:
            "Dalam had pada kira-kira $$385\\text{ mg}$$ per kg, kira-kira $$2.0$$ tin bagi orang dewasa, dan satu tin menyebabkan kanak-kanak melebihi pengambilan harian",
        },
        {
          correct: false,
          label:
            "Dalam had pada kira-kira $$127\\text{ mg}$$ per kg, kira-kira $$2.4$$ tin bagi orang dewasa, dan satu tin mengekalkan kanak-kanak di bawah pengambilan harian",
        },
        {
          correct: true,
          label:
            "Dalam had pada kira-kira $$385\\text{ mg}$$ per kg, kira-kira $$2.4$$ tin bagi orang dewasa, dan satu tin menyebabkan kanak-kanak melebihi pengambilan harian",
        },
      ],
    },
  },
};

export default item;
