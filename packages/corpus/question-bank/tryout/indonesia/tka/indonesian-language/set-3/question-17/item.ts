import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "menunjukkan bahwa bagian cello dapat digantikan oleh jeda dalam susunan musik",
        },
        {
          isCorrect: true,
          label:
            "membuat Rafi merasakan fungsi diam melalui ketiadaan melodi cello",
        },
        {
          isCorrect: false,
          label:
            "membuat pelatih memindahkan bagian cello ke sesi latihan berikutnya",
        },
        {
          isCorrect: false,
          label: "mengubah klarinet menjadi alat musik gesek",
        },
        {
          isCorrect: false,
          label: "menunjukkan konser telah selesai",
        },
      ],
    },
  },
  stimulusKey: "empty-measure",
};

export default item;
