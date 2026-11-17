import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.88$$ tonnes, $$70.0\\text{ kg}$$, $$3.96$$ tonnes",
        },
        {
          correct: false,
          label: "$$3.13$$ tonnes, $$0\\text{ kg}$$, $$4.13$$ tonnes",
        },
        {
          correct: true,
          label: "$$3.00$$ tonnes, $$70.0\\text{ kg}$$, $$3.96$$ tonnes",
        },
        {
          correct: false,
          label: "$$3.00$$ tonnes, $$1750\\text{ kg}$$, $$3.96$$ tonnes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.88$$ tan, $$70.0\\text{ kg}$$, $$3.96$$ tan",
        },
        {
          correct: false,
          label: "$$3.13$$ tan, $$0\\text{ kg}$$, $$4.13$$ tan",
        },
        {
          correct: true,
          label: "$$3.00$$ tan, $$70.0\\text{ kg}$$, $$3.96$$ tan",
        },
        {
          correct: false,
          label: "$$3.00$$ tan, $$1750\\text{ kg}$$, $$3.96$$ tan",
        },
      ],
    },
  },
};

export default item;
