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
            "$$65\\text{ kg}$$, and carbon could also reduce iron(III) oxide and lead(II) oxide but not aluminium oxide",
        },
        {
          correct: false,
          label:
            "$$65\\text{ kg}$$, and carbon could also reduce aluminium oxide",
        },
        {
          correct: false,
          label:
            "$$81\\text{ kg}$$, and carbon could also reduce iron(III) oxide and lead(II) oxide",
        },
        {
          correct: false,
          label: "$$48.8\\text{ kg}$$, because carbon is the limiting reagent",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$65\\text{ kg}$$, dan karbon juga boleh menurunkan ferum(III) oksida dan plumbum(II) oksida tetapi bukan aluminium oksida",
        },
        {
          correct: false,
          label:
            "$$65\\text{ kg}$$, dan karbon juga boleh menurunkan aluminium oksida",
        },
        {
          correct: false,
          label:
            "$$81\\text{ kg}$$, dan karbon juga boleh menurunkan ferum(III) oksida dan plumbum(II) oksida",
        },
        {
          correct: false,
          label:
            "$$48.8\\text{ kg}$$, kerana karbon ialah bahan tindak balas pengehad",
        },
      ],
    },
  },
};

export default item;
