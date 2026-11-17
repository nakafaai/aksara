import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$950\\text{ nm}$$ and $$4.7\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: true,
          label: "$$422\\text{ nm}$$ and $$4.7\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$422\\text{ nm}$$ and $$3.2\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$633\\text{ nm}$$ and $$3.2\\times10^{14}\\text{ Hz}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$950\\text{ nm}$$ dan $$4.7\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: true,
          label: "$$422\\text{ nm}$$ dan $$4.7\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$422\\text{ nm}$$ dan $$3.2\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$633\\text{ nm}$$ dan $$3.2\\times10^{14}\\text{ Hz}$$",
        },
      ],
    },
  },
};

export default item;
