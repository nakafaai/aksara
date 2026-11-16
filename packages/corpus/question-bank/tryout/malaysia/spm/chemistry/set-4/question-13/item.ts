import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sodium $$0.042\\text{ mol}$$ and aluminium $$0.100\\text{ mol}$$, so aluminium has about $$2.4$$ times as many",
        },
        {
          correct: false,
          label:
            "Sodium $$0.042\\text{ mol}$$ and aluminium $$0.300\\text{ mol}$$, but sodium melts higher because its atoms are larger",
        },
        {
          correct: false,
          label:
            "Sodium $$0.97\\text{ mol}$$ and aluminium $$2.70\\text{ mol}$$, so aluminium has about $$2.8$$ times as many",
        },
        {
          correct: true,
          label:
            "Sodium $$0.042\\text{ mol}$$ and aluminium $$0.300\\text{ mol}$$, about $$7$$ times as many, so aluminium has the stronger metallic bonding and melts higher",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Natrium $$0.042\\text{ mol}$$ dan aluminium $$0.100\\text{ mol}$$, jadi aluminium mempunyai kira-kira $$2.4$$ kali ganda",
        },
        {
          correct: false,
          label:
            "Natrium $$0.042\\text{ mol}$$ dan aluminium $$0.300\\text{ mol}$$, tetapi natrium melebur pada suhu lebih tinggi kerana atomnya lebih besar",
        },
        {
          correct: false,
          label:
            "Natrium $$0.97\\text{ mol}$$ dan aluminium $$2.70\\text{ mol}$$, jadi aluminium mempunyai kira-kira $$2.8$$ kali ganda",
        },
        {
          correct: true,
          label:
            "Natrium $$0.042\\text{ mol}$$ dan aluminium $$0.300\\text{ mol}$$, kira-kira $$7$$ kali ganda, jadi ikatan logam aluminium lebih kuat dan takat leburnya lebih tinggi",
        },
      ],
    },
  },
};

export default item;
