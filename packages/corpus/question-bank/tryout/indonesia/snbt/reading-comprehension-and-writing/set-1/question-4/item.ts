import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "village-radio",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "_ialah_ diganti _adalah_",
        },
        {
          correct: false,
          label: "_gabah_ diganti _padi_",
        },
        {
          correct: false,
          label: "_kabar_ diganti _khabar_",
        },
        {
          correct: true,
          label: "_jam_ diganti _pukul_",
        },
        {
          correct: false,
          label: "_setiap_ diganti _tiap-tiap_",
        },
      ],
    },
  },
};

export default item;
