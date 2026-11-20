import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$${}^{237}_{93}\\text{Np}$$, $$4.65\\times10^{-10}\\text{ A}$$ and $$4.65\\times10^{-10}\\text{ A}$$",
        },
        {
          correct: true,
          label:
            "$${}^{237}_{93}\\text{Np}$$, $$2.33\\times10^{-10}\\text{ A}$$ and $$4.65\\times10^{-10}\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$${}^{237}_{93}\\text{Np}$$, $$2.33\\times10^{-10}\\text{ A}$$ and $$5.81\\times10^{-10}\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$${}^{241}_{96}\\text{Cm}$$, $$2.33\\times10^{-10}\\text{ A}$$ and $$4.65\\times10^{-10}\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$${}^{237}_{93}\\text{Np}$$, $$4.65\\times10^{-10}\\text{ A}$$ dan $$4.65\\times10^{-10}\\text{ A}$$",
        },
        {
          correct: true,
          label:
            "$${}^{237}_{93}\\text{Np}$$, $$2.33\\times10^{-10}\\text{ A}$$ dan $$4.65\\times10^{-10}\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$${}^{237}_{93}\\text{Np}$$, $$2.33\\times10^{-10}\\text{ A}$$ dan $$5.81\\times10^{-10}\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$${}^{241}_{96}\\text{Cm}$$, $$2.33\\times10^{-10}\\text{ A}$$ dan $$4.65\\times10^{-10}\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
