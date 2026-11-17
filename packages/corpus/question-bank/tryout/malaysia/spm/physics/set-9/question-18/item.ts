import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
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
            "$$10\\text{ cm}$$ beyond the second lens, upright and $$4$$ times as tall",
        },
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$ beyond the first lens, inverted and twice as tall",
        },
        {
          correct: true,
          label:
            "$$10\\text{ cm}$$ in front of the second lens, inverted and $$4$$ times as tall",
        },
        {
          correct: false,
          label:
            "$$10\\text{ cm}$$ in front of the second lens, upright and $$4$$ times as tall",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$10\\text{ cm}$$ di luar kanta kedua, tegak dan $$4$$ kali tingginya",
        },
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$ di luar kanta pertama, songsang dan dua kali tingginya",
        },
        {
          correct: true,
          label:
            "$$10\\text{ cm}$$ di hadapan kanta kedua, songsang dan $$4$$ kali tingginya",
        },
        {
          correct: false,
          label:
            "$$10\\text{ cm}$$ di hadapan kanta kedua, tegak dan $$4$$ kali tingginya",
        },
      ],
    },
  },
};

export default item;
