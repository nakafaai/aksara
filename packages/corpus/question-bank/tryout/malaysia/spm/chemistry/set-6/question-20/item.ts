import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$9.17\\times10^{21}$$, the copper and silver atoms form ionic bonds with the gold atoms",
        },
        {
          correct: true,
          label:
            "$$9.17\\times10^{21}$$, atoms of other sizes disrupt the layers of gold atoms so they cannot slide easily",
        },
        {
          correct: false,
          label:
            "$$2.20\\times10^{20}$$, atoms of other sizes disrupt the layers of gold atoms so they cannot slide easily",
        },
        {
          correct: false,
          label:
            "$$1.22\\times10^{22}$$, atoms of other sizes disrupt the layers of gold atoms so they cannot slide easily",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$9.17\\times10^{21}$$, atom kuprum dan argentum membentuk ikatan ion dengan atom emas",
        },
        {
          correct: true,
          label:
            "$$9.17\\times10^{21}$$, atom bersaiz lain mengganggu lapisan atom emas supaya ia tidak mudah menggelongsor",
        },
        {
          correct: false,
          label:
            "$$2.20\\times10^{20}$$, atom bersaiz lain mengganggu lapisan atom emas supaya ia tidak mudah menggelongsor",
        },
        {
          correct: false,
          label:
            "$$1.22\\times10^{22}$$, atom bersaiz lain mengganggu lapisan atom emas supaya ia tidak mudah menggelongsor",
        },
      ],
    },
  },
};

export default item;
