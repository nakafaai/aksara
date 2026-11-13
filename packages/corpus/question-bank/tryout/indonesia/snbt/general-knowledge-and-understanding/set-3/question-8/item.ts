import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "affix-meaning",
  },
  stimulus: "kedelai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "*Pemindahan* bibit dari persemaian ke sawah dilakukan pada sore hari.",
        },
        {
          correct: false,
          label: "Bus itu menunggu penumpang di *perhentian* dekat pasar.",
        },
        {
          correct: true,
          label:
            "*Perputaran* kincir air itu melambat ketika aliran sungai menyusut.",
        },
        {
          correct: false,
          label: "Ibu menyimpan *perhiasan* emasnya di dalam lemari.",
        },
        {
          correct: false,
          label:
            "*Perbaikan* pematang sawah itu dikerjakan warga secara bergotong royong.",
        },
      ],
    },
  },
};

export default item;
