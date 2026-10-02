import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan mengelompokkan pertanyaan dan menilai pemahaman sambil mengubah aturan ukuran kelompok.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan mengelompokkan jenis pertanyaan dan menilai pemahaman sambil mempertahankan aturan ukuran kelompok.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya sesi dengan jumlah pengunjung yang bertanya paling tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan kartu permanen sebagai pengganti penilaian lanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mempertahankan aturan kelompok tanpa menilai pemahaman atau mengelompokkan pertanyaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
