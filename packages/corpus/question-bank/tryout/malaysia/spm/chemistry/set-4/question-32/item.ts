import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "0.72 dm³ of hydrogen over a nickel catalyst, and the fat formed has a higher melting point than the oil",
        },
        {
          correct: false,
          label:
            "0.24 dm³ of hydrogen over a nickel catalyst, and the fat formed has a higher melting point than the oil",
        },
        {
          correct: false,
          label:
            "0.72 dm³ of hydrogen over a nickel catalyst, and the fat formed has a lower melting point than the oil",
        },
        {
          correct: false,
          label:
            "2.16 dm³ of hydrogen over a nickel catalyst, and the fat formed has a higher melting point than the oil",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "0.72 dm³ hidrogen di atas mangkin nikel, dan lemak yang terbentuk mempunyai takat lebur lebih tinggi daripada minyak",
        },
        {
          correct: false,
          label:
            "0.24 dm³ hidrogen di atas mangkin nikel, dan lemak yang terbentuk mempunyai takat lebur lebih tinggi daripada minyak",
        },
        {
          correct: false,
          label:
            "0.72 dm³ hidrogen di atas mangkin nikel, dan lemak yang terbentuk mempunyai takat lebur lebih rendah daripada minyak",
        },
        {
          correct: false,
          label:
            "2.16 dm³ hidrogen di atas mangkin nikel, dan lemak yang terbentuk mempunyai takat lebur lebih tinggi daripada minyak",
        },
      ],
    },
  },
};

export default item;
