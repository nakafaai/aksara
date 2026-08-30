import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam tur bangunan bersejarah pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang tur bangunan bersejarah tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang triangulasi cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
        {
          isCorrect: true,
          label:
            "Perbedaan antarsumber dapat memperkaya penafsiran jika asal dan tujuan setiap sumber diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
