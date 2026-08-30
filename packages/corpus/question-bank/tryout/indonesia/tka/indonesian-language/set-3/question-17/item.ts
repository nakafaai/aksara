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
          label: "membuktikan cello tidak diperlukan",
        },
        {
          isCorrect: false,
          label: "membuat pelatih menghapus bagian ketiga",
        },
        {
          isCorrect: false,
          label: "mengubah klarinet menjadi alat musik gesek",
        },
        {
          isCorrect: false,
          label: "menunjukkan konser telah selesai",
        },
        {
          isCorrect: true,
          label:
            "membuat Rafi merasakan fungsi diam melalui ketiadaan melodi cello",
        },
      ],
    },
  },
  stimulusKey: "empty-measure",
};

export default item;
