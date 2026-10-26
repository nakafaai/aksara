import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  stimulus: "empty-measure",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menunjukkan bahwa bagian cello dapat digantikan oleh jeda dalam susunan musik",
        },
        {
          correct: true,
          label:
            "membuat Rafi merasakan fungsi diam melalui ketiadaan melodi cello",
        },
        {
          correct: false,
          label:
            "membuat pelatih memindahkan bagian cello ke sesi latihan berikutnya",
        },
        {
          correct: false,
          label: "mengubah klarinet menjadi alat musik gesek",
        },
        {
          correct: false,
          label: "menunjukkan konser telah selesai",
        },
      ],
    },
  },
};

export default item;
