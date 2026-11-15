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
          correct: true,
          label: "Magnification $$20$$, distance $$105\\text{ cm}$$",
        },
        {
          correct: false,
          label: "Magnification $$0.05$$, distance $$105\\text{ cm}$$",
        },
        {
          correct: false,
          label: "Magnification $$20$$, distance $$95\\text{ cm}$$",
        },
        {
          correct: false,
          label: "Magnification $$21$$, distance $$100\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Pembesaran $$20$$, jarak $$105\\text{ cm}$$",
        },
        {
          correct: false,
          label: "Pembesaran $$0.05$$, jarak $$105\\text{ cm}$$",
        },
        {
          correct: false,
          label: "Pembesaran $$20$$, jarak $$95\\text{ cm}$$",
        },
        {
          correct: false,
          label: "Pembesaran $$21$$, jarak $$100\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
