import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$16\\text{ cm}$$; $$0.83\\text{ cm}$$ away from the objective",
        },
        {
          correct: true,
          label: "$$16\\text{ cm}$$; $$0.83\\text{ cm}$$ towards the objective",
        },
        {
          correct: false,
          label:
            "$$16\\text{ cm}$$; $$1.25\\text{ cm}$$ away from the objective",
        },
        {
          correct: false,
          label: "$$11\\text{ cm}$$; $$0.83\\text{ cm}$$ towards the objective",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$16\\text{ cm}$$; $$0.83\\text{ cm}$$ menjauhi objektif",
        },
        {
          correct: true,
          label: "$$16\\text{ cm}$$; $$0.83\\text{ cm}$$ ke arah objektif",
        },
        {
          correct: false,
          label: "$$16\\text{ cm}$$; $$1.25\\text{ cm}$$ menjauhi objektif",
        },
        {
          correct: false,
          label: "$$11\\text{ cm}$$; $$0.83\\text{ cm}$$ ke arah objektif",
        },
      ],
    },
  },
};

export default item;
