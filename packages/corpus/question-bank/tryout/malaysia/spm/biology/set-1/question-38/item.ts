import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "genetic-technology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4$$ fragments, $$2000$$ base pairs",
        },
        {
          correct: true,
          label: "$$3$$ fragments, $$2500$$ base pairs",
        },
        {
          correct: false,
          label: "$$3$$ fragments, $$3500$$ base pairs",
        },
        {
          correct: false,
          label: "$$3$$ fragments, $$2000$$ base pairs",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4$$ serpihan, $$2000$$ pasangan bes",
        },
        {
          correct: true,
          label: "$$3$$ serpihan, $$2500$$ pasangan bes",
        },
        {
          correct: false,
          label: "$$3$$ serpihan, $$3500$$ pasangan bes",
        },
        {
          correct: false,
          label: "$$3$$ serpihan, $$2000$$ pasangan bes",
        },
      ],
    },
  },
};

export default item;
