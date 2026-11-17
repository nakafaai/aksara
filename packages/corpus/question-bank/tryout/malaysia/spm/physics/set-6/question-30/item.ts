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
          correct: true,
          label: "$$0.96\\text{ W}$$ in parallel, and $$2.4\\text{ W}$$ mixed",
        },
        {
          correct: false,
          label: "$$1.1\\text{ W}$$ in parallel, and $$4.5\\text{ W}$$ mixed",
        },
        {
          correct: false,
          label: "$$0.37\\text{ W}$$ in parallel, and $$1.5\\text{ W}$$ mixed",
        },
        {
          correct: false,
          label: "$$0.96\\text{ W}$$ in parallel, and $$2.0\\text{ W}$$ mixed",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.96\\text{ W}$$ selari, dan $$2.4\\text{ W}$$ bercampur",
        },
        {
          correct: false,
          label: "$$1.1\\text{ W}$$ selari, dan $$4.5\\text{ W}$$ bercampur",
        },
        {
          correct: false,
          label: "$$0.37\\text{ W}$$ selari, dan $$1.5\\text{ W}$$ bercampur",
        },
        {
          correct: false,
          label: "$$0.96\\text{ W}$$ selari, dan $$2.0\\text{ W}$$ bercampur",
        },
      ],
    },
  },
};

export default item;
