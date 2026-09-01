import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kartu mengubah suasana karena bentuk fisiknya lebih menarik daripada sakelar dan diagram pada meja pameran.",
        },
        {
          isCorrect: true,
          label:
            "Pertanyaan pada kartu menahan tindakan otomatis pengunjung dan mengarahkannya menjadi percobaan, pembacaan diagram, serta percakapan.",
        },
        {
          isCorrect: false,
          label:
            "Kartu mengubah suasana dengan menyatakan jawaban percobaan secara langsung sehingga pengunjung tidak perlu berdiskusi.",
        },
        {
          isCorrect: false,
          label:
            "Kartu membuat bel dan pengeras suara berhenti, sehingga penyebab perubahan suasana sepenuhnya berasal dari latar yang mendadak sunyi.",
        },
        {
          isCorrect: false,
          label:
            "Kartu tetap menandai kegagalan pengunjung bertanya karena tidak ada seorang pun yang menuliskan jawaban di atasnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
