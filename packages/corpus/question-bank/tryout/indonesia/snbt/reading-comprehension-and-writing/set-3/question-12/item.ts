import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "suspension-bridge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "_sedangkan_ diganti _sehingga_",
        },
        {
          correct: true,
          label: "_dari_ diganti _oleh_",
        },
        {
          correct: false,
          label: "_tenaga_ diganti _kekuatan_",
        },
        {
          correct: false,
          label: "_disediakan_ diganti _menyediakan_",
        },
        {
          correct: false,
          label: "_menyumbang_ diganti _disumbang_",
        },
      ],
    },
  },
};

export default item;
