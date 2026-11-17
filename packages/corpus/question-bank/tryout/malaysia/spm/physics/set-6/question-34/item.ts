import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.024\\text{ N m}$$ the same way, then $$0.012\\text{ N m}$$",
        },
        {
          correct: false,
          label:
            "$$0.024\\text{ N m}$$ the opposite way, then $$0.012\\text{ N m}$$",
        },
        {
          correct: false,
          label:
            "$$0.012\\text{ N m}$$ the same way, then $$0.0060\\text{ N m}$$",
        },
        {
          correct: false,
          label:
            "$$0.024\\text{ N m}$$ the same way, then $$0.021\\text{ N m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.024\\text{ N m}$$ ke arah yang sama, kemudian $$0.012\\text{ N m}$$",
        },
        {
          correct: false,
          label:
            "$$0.024\\text{ N m}$$ ke arah bertentangan, kemudian $$0.012\\text{ N m}$$",
        },
        {
          correct: false,
          label:
            "$$0.012\\text{ N m}$$ ke arah yang sama, kemudian $$0.0060\\text{ N m}$$",
        },
        {
          correct: false,
          label:
            "$$0.024\\text{ N m}$$ ke arah yang sama, kemudian $$0.021\\text{ N m}$$",
        },
      ],
    },
  },
};

export default item;
