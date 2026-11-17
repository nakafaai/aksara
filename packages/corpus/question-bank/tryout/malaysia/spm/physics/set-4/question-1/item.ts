import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$397\\text{ g}$$, and ignoring the zero error makes it about $$1.3\\%$$ too large",
        },
        {
          correct: false,
          label:
            "$$397\\text{ g}$$, and ignoring the zero error changes nothing, because the error cancels",
        },
        {
          correct: false,
          label:
            "$$402\\text{ g}$$, and ignoring the zero error changes nothing, because the error cancels",
        },
        {
          correct: false,
          label:
            "$$1590\\text{ g}$$, and ignoring the zero error makes it about $$1.3\\%$$ too large",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$397\\text{ g}$$, dan mengabaikan ralat sifar menjadikannya kira-kira $$1.3\\%$$ terlalu besar",
        },
        {
          correct: false,
          label:
            "$$397\\text{ g}$$, dan mengabaikan ralat sifar tidak mengubah apa-apa, kerana ralat itu terbatal",
        },
        {
          correct: false,
          label:
            "$$402\\text{ g}$$, dan mengabaikan ralat sifar tidak mengubah apa-apa, kerana ralat itu terbatal",
        },
        {
          correct: false,
          label:
            "$$1590\\text{ g}$$, dan mengabaikan ralat sifar menjadikannya kira-kira $$1.3\\%$$ terlalu besar",
        },
      ],
    },
  },
};

export default item;
