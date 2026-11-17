import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$28\\text{ m}$$ below the platform, with the cord pulling $$2.6\\text{ kN}$$",
        },
        {
          correct: false,
          label:
            "$$18\\text{ m}$$ below the platform, with the cord pulling $$600\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$21\\text{ m}$$ below the platform, with the cord pulling $$1.2\\text{ kN}$$",
        },
        {
          correct: false,
          label:
            "$$13\\text{ m}$$ below the platform, with the cord pulling $$2.6\\text{ kN}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$28\\text{ m}$$ di bawah pelantar, dengan tali menarik $$2.6\\text{ kN}$$",
        },
        {
          correct: false,
          label:
            "$$18\\text{ m}$$ di bawah pelantar, dengan tali menarik $$600\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$21\\text{ m}$$ di bawah pelantar, dengan tali menarik $$1.2\\text{ kN}$$",
        },
        {
          correct: false,
          label:
            "$$13\\text{ m}$$ di bawah pelantar, dengan tali menarik $$2.6\\text{ kN}$$",
        },
      ],
    },
  },
};

export default item;
