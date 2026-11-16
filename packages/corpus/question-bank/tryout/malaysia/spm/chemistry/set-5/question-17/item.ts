import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$-44.5\\text{ kJ mol}^{-1}$$, and the cooled solution is more concentrated than $$0.400\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$+44.5\\text{ kJ mol}^{-1}$$, and the cooled solution is more concentrated than $$0.400\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$-44.5\\text{ kJ mol}^{-1}$$, and the cooled solution is less concentrated than $$0.400\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$-4.45\\text{ kJ mol}^{-1}$$, and the temperature has no effect on the concentration",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$-44.5\\text{ kJ mol}^{-1}$$, dan larutan yang sejuk lebih pekat daripada $$0.400\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$+44.5\\text{ kJ mol}^{-1}$$, dan larutan yang sejuk lebih pekat daripada $$0.400\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$-44.5\\text{ kJ mol}^{-1}$$, dan larutan yang sejuk kurang pekat daripada $$0.400\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$-4.45\\text{ kJ mol}^{-1}$$, dan suhu tidak mempengaruhi kepekatan",
        },
      ],
    },
  },
};

export default item;
