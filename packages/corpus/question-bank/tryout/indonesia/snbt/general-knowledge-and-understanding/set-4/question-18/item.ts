import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "figurative-meaning",
  },
  stimulus: "rawa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "tertahan di dalam timbunan sisa tumbuhan selama timbunan itu tetap tergenang",
        },
        {
          correct: false,
          label: "tersimpan untuk selamanya dan tidak mungkin terlepas lagi",
        },
        {
          correct: false,
          label: "tertutup rapat sehingga tidak dapat dimasuki air",
        },
        {
          correct: false,
          label: "terikat pada air sehingga ikut mengalir bersama air",
        },
        {
          correct: false,
          label: "terhenti penguraiannya karena mikroba pengurai mati",
        },
      ],
    },
  },
};

export default item;
