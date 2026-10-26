import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kartu mengubah suasana karena bentuk fisiknya lebih menarik daripada sakelar dan diagram pada meja pameran.",
        },
        {
          correct: true,
          label:
            "Pertanyaan pada kartu menahan tindakan otomatis pengunjung dan mengarahkannya menjadi percobaan, pembacaan diagram, serta percakapan.",
        },
        {
          correct: false,
          label:
            "Kartu mengubah suasana dengan menyatakan jawaban percobaan secara langsung sehingga pengunjung tidak perlu berdiskusi.",
        },
        {
          correct: false,
          label:
            "Kartu membuat bel dan pengeras suara berhenti, sehingga penyebab perubahan suasana sepenuhnya berasal dari latar yang mendadak sunyi.",
        },
        {
          correct: false,
          label:
            "Kartu tetap menandai kegagalan pengunjung bertanya karena tidak ada seorang pun yang menuliskan jawaban di atasnya.",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
