import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Perbedaan antarsumber dapat memperkaya penafsiran jika asal dan tujuan setiap sumber diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam kelas reparasi pakaian pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang kelas reparasi pakaian tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang sejarah lisan cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
