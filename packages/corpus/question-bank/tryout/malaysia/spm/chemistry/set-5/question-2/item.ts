import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$19.2\\text{ kJ mol}^{-1}$$, and the kinetic energy of the molecules rises",
        },
        {
          correct: false,
          label:
            "$$3.84\\text{ kJ mol}^{-1}$$, and the heat overcomes the forces between molecules",
        },
        {
          correct: false,
          label:
            "$$38.4\\text{ kJ mol}^{-1}$$, and the heat overcomes the forces between molecules",
        },
        {
          correct: true,
          label:
            "$$19.2\\text{ kJ mol}^{-1}$$, and the heat overcomes the forces between molecules while their kinetic energy stays constant",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$19.2\\text{ kJ mol}^{-1}$$, dan tenaga kinetik molekul meningkat",
        },
        {
          correct: false,
          label:
            "$$3.84\\text{ kJ mol}^{-1}$$, dan haba mengatasi daya antara molekul",
        },
        {
          correct: false,
          label:
            "$$38.4\\text{ kJ mol}^{-1}$$, dan haba mengatasi daya antara molekul",
        },
        {
          correct: true,
          label:
            "$$19.2\\text{ kJ mol}^{-1}$$, dan haba mengatasi daya antara molekul sementara tenaga kinetiknya kekal malar",
        },
      ],
    },
  },
};

export default item;
