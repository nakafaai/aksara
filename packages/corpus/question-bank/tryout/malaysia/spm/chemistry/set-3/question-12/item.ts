import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{Li}_3\\text{N}$$, with $$1.40\\text{ g}$$ of lithium oxide and $$1.40\\text{ g}$$ of lithium nitride",
        },
        {
          correct: true,
          label:
            "$$\\text{Li}_3\\text{N}$$, with $$2.10\\text{ g}$$ of lithium oxide and $$0.70\\text{ g}$$ of lithium nitride",
        },
        {
          correct: false,
          label:
            "$$\\text{Li}_3\\text{N}$$, with $$0.70\\text{ g}$$ of lithium oxide and $$2.10\\text{ g}$$ of lithium nitride",
        },
        {
          correct: false,
          label:
            "$$\\text{LiN}_3$$, with $$2.10\\text{ g}$$ of lithium oxide and $$0.70\\text{ g}$$ of lithium nitride",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{Li}_3\\text{N}$$, dengan $$1.40\\text{ g}$$ litium oksida dan $$1.40\\text{ g}$$ litium nitrida",
        },
        {
          correct: true,
          label:
            "$$\\text{Li}_3\\text{N}$$, dengan $$2.10\\text{ g}$$ litium oksida dan $$0.70\\text{ g}$$ litium nitrida",
        },
        {
          correct: false,
          label:
            "$$\\text{Li}_3\\text{N}$$, dengan $$0.70\\text{ g}$$ litium oksida dan $$2.10\\text{ g}$$ litium nitrida",
        },
        {
          correct: false,
          label:
            "$$\\text{LiN}_3$$, dengan $$2.10\\text{ g}$$ litium oksida dan $$0.70\\text{ g}$$ litium nitrida",
        },
      ],
    },
  },
};

export default item;
