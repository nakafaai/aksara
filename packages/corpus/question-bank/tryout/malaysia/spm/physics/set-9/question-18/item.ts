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
            "$$20\\text{ cm}$$ beyond the second lens, inverted and twice as tall",
        },
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$ beyond the first lens, inverted and twice as tall",
        },
        {
          correct: true,
          label:
            "$$20\\text{ cm}$$ beyond the second lens, upright and twice as tall",
        },
        {
          correct: false,
          label:
            "$$20\\text{ cm}$$ beyond the second lens, upright and four times as tall",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$20\\text{ cm}$$ di luar kanta kedua, songsang dan dua kali tingginya",
        },
        {
          correct: false,
          label:
            "$$30\\text{ cm}$$ di luar kanta pertama, songsang dan dua kali tingginya",
        },
        {
          correct: true,
          label:
            "$$20\\text{ cm}$$ di luar kanta kedua, tegak dan dua kali tingginya",
        },
        {
          correct: false,
          label:
            "$$20\\text{ cm}$$ di luar kanta kedua, tegak dan empat kali tingginya",
        },
      ],
    },
  },
};

export default item;
