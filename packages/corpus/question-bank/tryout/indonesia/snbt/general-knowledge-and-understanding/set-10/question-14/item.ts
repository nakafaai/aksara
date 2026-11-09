import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "cause",
  },
  stimulus: "bekantan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "buah yang belum matang lebih mudah ditemukan di hutan bakau",
        },
        {
          correct: false,
          label: "bekantan tidak dapat mencium bau buah matang",
        },
        {
          correct: true,
          label: "buah matang yang manis membuat perut bekantan kembung",
        },
        {
          correct: false,
          label: "buah yang belum matang mengandung bakteri pencerna daun",
        },
        {
          correct: false,
          label:
            "bekantan hanya makan pada malam hari ketika buah belum matang",
        },
      ],
    },
  },
};

export default item;
