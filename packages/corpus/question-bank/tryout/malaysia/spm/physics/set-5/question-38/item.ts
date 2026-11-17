import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About $$11$$ years longer, with $$12.5\\text{ TBq}$$ left",
        },
        {
          correct: false,
          label: "About $$5.3$$ years longer, with $$50\\text{ TBq}$$ left",
        },
        {
          correct: true,
          label: "About $$5.3$$ years longer, with $$25\\text{ TBq}$$ left",
        },
        {
          correct: false,
          label: "About $$5.3$$ years longer, with $$100\\text{ TBq}$$ left",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kira-kira $$11$$ tahun lagi, dengan $$12.5\\text{ TBq}$$ tinggal",
        },
        {
          correct: false,
          label:
            "Kira-kira $$5.3$$ tahun lagi, dengan $$50\\text{ TBq}$$ tinggal",
        },
        {
          correct: true,
          label:
            "Kira-kira $$5.3$$ tahun lagi, dengan $$25\\text{ TBq}$$ tinggal",
        },
        {
          correct: false,
          label:
            "Kira-kira $$5.3$$ tahun lagi, dengan $$100\\text{ TBq}$$ tinggal",
        },
      ],
    },
  },
};

export default item;
