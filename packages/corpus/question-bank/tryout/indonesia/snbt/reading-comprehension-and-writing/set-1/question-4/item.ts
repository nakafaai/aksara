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
          label: "_karena_ diganti _sehingga_",
        },
        {
          correct: false,
          label: "_dapat_ diganti _harus_",
        },
        {
          correct: false,
          label: "_menentukan_ diganti _menentukannya_",
        },
        {
          correct: true,
          label: "_pada_ diganti _dengan_",
        },
        {
          correct: false,
          label: "_lebih_ diganti _paling_",
        },
      ],
    },
  },
};

export default item;
