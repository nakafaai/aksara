import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Manganese is reduced from +7 to +2, and 1.2 dm³ of chlorine forms",
        },
        {
          correct: false,
          label:
            "Manganese is oxidised from +7 to +2, and 1.2 dm³ of chlorine forms",
        },
        {
          correct: false,
          label:
            "Manganese is reduced from +7 to +2, and 0.48 dm³ of chlorine forms",
        },
        {
          correct: false,
          label:
            "Manganese is reduced from +7 to +2, and 2.4 dm³ of chlorine forms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mangan diturunkan daripada +7 kepada +2, dan 1.2 dm³ klorin terbentuk",
        },
        {
          correct: false,
          label:
            "Mangan dioksidakan daripada +7 kepada +2, dan 1.2 dm³ klorin terbentuk",
        },
        {
          correct: false,
          label:
            "Mangan diturunkan daripada +7 kepada +2, dan 0.48 dm³ klorin terbentuk",
        },
        {
          correct: false,
          label:
            "Mangan diturunkan daripada +7 kepada +2, dan 2.4 dm³ klorin terbentuk",
        },
      ],
    },
  },
};

export default item;
