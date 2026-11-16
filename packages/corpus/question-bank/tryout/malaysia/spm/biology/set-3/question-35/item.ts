import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "genetic-technology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$90$$ colonies, which grow on both ampicillin and tetracycline",
        },
        { correct: false, label: "$$120$$ colonies, which grow on ampicillin" },
        {
          correct: true,
          label:
            "$$30$$ colonies, which grow on ampicillin but not on tetracycline",
        },
        {
          correct: false,
          label:
            "$$30$$ colonies, which grow on tetracycline but not on ampicillin",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$90$$ koloni, yang tumbuh pada ampisilin dan tetrasiklin",
        },
        { correct: false, label: "$$120$$ koloni, yang tumbuh pada ampisilin" },
        {
          correct: true,
          label:
            "$$30$$ koloni, yang tumbuh pada ampisilin tetapi tidak pada tetrasiklin",
        },
        {
          correct: false,
          label:
            "$$30$$ koloni, yang tumbuh pada tetrasiklin tetapi tidak pada ampisilin",
        },
      ],
    },
  },
};

export default item;
