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
            "$$1.1\\text{ cm}$$, and a real, inverted image $$0.82$$ times as tall",
        },
        {
          correct: true,
          label:
            "$$2.25\\text{ cm}$$, and a real, inverted image $$9$$ times as tall",
        },
        {
          correct: false,
          label:
            "$$2.25\\text{ cm}$$, and a virtual, upright image $$9$$ times as tall",
        },
        {
          correct: false,
          label:
            "$$2.25\\text{ cm}$$, and a real, inverted image $$0.11$$ times as tall",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.1\\text{ cm}$$, dan imej nyata, songsang $$0.82$$ kali tingginya",
        },
        {
          correct: true,
          label:
            "$$2.25\\text{ cm}$$, dan imej nyata, songsang $$9$$ kali tingginya",
        },
        {
          correct: false,
          label:
            "$$2.25\\text{ cm}$$, dan imej maya, tegak $$9$$ kali tingginya",
        },
        {
          correct: false,
          label:
            "$$2.25\\text{ cm}$$, dan imej nyata, songsang $$0.11$$ kali tingginya",
        },
      ],
    },
  },
};

export default item;
