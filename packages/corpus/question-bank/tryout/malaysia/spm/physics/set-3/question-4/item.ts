import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$22.5\\text{ m s}^{-1}$$ away from the wall, and no kinetic energy is lost",
        },
        {
          correct: false,
          label:
            "$$7.5\\text{ m s}^{-1}$$ away from the wall, and $$50\\%$$ of the kinetic energy is lost",
        },
        {
          correct: true,
          label:
            "$$7.5\\text{ m s}^{-1}$$ away from the wall, and $$75\\%$$ of the kinetic energy is lost",
        },
        {
          correct: false,
          label:
            "$$15\\text{ m s}^{-1}$$ away from the wall, and no kinetic energy is lost",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$22.5\\text{ m s}^{-1}$$ menjauhi dinding, dan tiada tenaga kinetik yang hilang",
        },
        {
          correct: false,
          label:
            "$$7.5\\text{ m s}^{-1}$$ menjauhi dinding, dan $$50\\%$$ tenaga kinetik hilang",
        },
        {
          correct: true,
          label:
            "$$7.5\\text{ m s}^{-1}$$ menjauhi dinding, dan $$75\\%$$ tenaga kinetik hilang",
        },
        {
          correct: false,
          label:
            "$$15\\text{ m s}^{-1}$$ menjauhi dinding, dan tiada tenaga kinetik yang hilang",
        },
      ],
    },
  },
};

export default item;
