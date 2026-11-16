import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$13.4\\text{ g}$$ of iron, with $$8.0\\text{ g}$$ of iron(III) oxide left over",
        },
        {
          correct: false,
          label:
            "$$11.2\\text{ g}$$ of iron, with no iron(III) oxide left over",
        },
        {
          correct: false,
          label:
            "$$8.96\\text{ g}$$ of iron, with $$16.0\\text{ g}$$ of iron(III) oxide left over",
        },
        {
          correct: true,
          label:
            "$$8.96\\text{ g}$$ of iron, with $$8.0\\text{ g}$$ of iron(III) oxide left over",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$13.4\\text{ g}$$ ferum, dengan $$8.0\\text{ g}$$ ferum(III) oksida berbaki",
        },
        {
          correct: false,
          label: "$$11.2\\text{ g}$$ ferum, tanpa ferum(III) oksida berbaki",
        },
        {
          correct: false,
          label:
            "$$8.96\\text{ g}$$ ferum, dengan $$16.0\\text{ g}$$ ferum(III) oksida berbaki",
        },
        {
          correct: true,
          label:
            "$$8.96\\text{ g}$$ ferum, dengan $$8.0\\text{ g}$$ ferum(III) oksida berbaki",
        },
      ],
    },
  },
};

export default item;
