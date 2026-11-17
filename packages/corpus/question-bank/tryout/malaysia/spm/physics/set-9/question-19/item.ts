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
        { correct: false, label: "$$2.5$$, and it is totally reflected" },
        { correct: true, label: "$$1.67$$, and it is totally reflected" },
        {
          correct: false,
          label: "$$1.67$$, and it leaves the glass at $$23^\\circ$$",
        },
        { correct: false, label: "$$1.67$$, and it leaves along the surface" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.5$$, dan ia dipantulkan sepenuhnya" },
        { correct: true, label: "$$1.67$$, dan ia dipantulkan sepenuhnya" },
        {
          correct: false,
          label: "$$1.67$$, dan ia keluar dari kaca pada $$23^\\circ$$",
        },
        {
          correct: false,
          label: "$$1.67$$, dan ia keluar di sepanjang permukaan",
        },
      ],
    },
  },
};

export default item;
