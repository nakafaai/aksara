import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.0\\,\\Omega$$, $$67\\%$$, and $$54\\text{ W}$$ once shorted",
        },
        {
          correct: false,
          label:
            "$$2.0\\,\\Omega$$, $$75\\%$$, and $$40\\text{ W}$$ once shorted",
        },
        {
          correct: false,
          label:
            "$$2.0\\,\\Omega$$, $$67\\%$$, and still $$24\\text{ W}$$ once shorted",
        },
        {
          correct: true,
          label:
            "$$2.0\\,\\Omega$$, $$67\\%$$, and $$40\\text{ W}$$ once shorted",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.0\\,\\Omega$$, $$67\\%$$, dan $$54\\text{ W}$$ apabila dilitar pintas",
        },
        {
          correct: false,
          label:
            "$$2.0\\,\\Omega$$, $$75\\%$$, dan $$40\\text{ W}$$ apabila dilitar pintas",
        },
        {
          correct: false,
          label:
            "$$2.0\\,\\Omega$$, $$67\\%$$, dan masih $$24\\text{ W}$$ apabila dilitar pintas",
        },
        {
          correct: true,
          label:
            "$$2.0\\,\\Omega$$, $$67\\%$$, dan $$40\\text{ W}$$ apabila dilitar pintas",
        },
      ],
    },
  },
};

export default item;
