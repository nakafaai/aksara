import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10\\text{ L}$$, or $$9.0\\text{ L}$$ with the leak",
        },
        {
          correct: false,
          label: "$$2.5\\text{ L}$$, or $$2.3\\text{ L}$$ with the leak",
        },
        {
          correct: true,
          label: "$$5.0\\text{ L}$$, or $$4.5\\text{ L}$$ with the leak",
        },
        {
          correct: false,
          label: "$$5.0\\text{ L}$$, or $$5.5\\text{ L}$$ with the leak",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10\\text{ L}$$, atau $$9.0\\text{ L}$$ dengan kebocoran",
        },
        {
          correct: false,
          label: "$$2.5\\text{ L}$$, atau $$2.3\\text{ L}$$ dengan kebocoran",
        },
        {
          correct: true,
          label: "$$5.0\\text{ L}$$, atau $$4.5\\text{ L}$$ dengan kebocoran",
        },
        {
          correct: false,
          label: "$$5.0\\text{ L}$$, atau $$5.5\\text{ L}$$ dengan kebocoran",
        },
      ],
    },
  },
};

export default item;
