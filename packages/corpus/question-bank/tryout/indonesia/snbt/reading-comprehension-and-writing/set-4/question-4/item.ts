import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Label foto dipilih agar keberhasilan pengembalian tidak perlu diukur lagi.",
        },
        {
          isCorrect: false,
          label:
            "Label foto dipilih agar tim dapat mengubah banyak kondisi sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Label foto dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Label foto dipilih hanya karena hasil akhir uji sudah dipastikan.",
        },
        {
          isCorrect: true,
          label:
            "Label foto dipilih untuk membantu peminjam mengenali rak pengembalian yang tepat.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
