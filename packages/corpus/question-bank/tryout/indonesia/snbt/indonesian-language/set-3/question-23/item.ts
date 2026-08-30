import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam ruang arsip sekolah pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang ruang arsip sekolah tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang metakognisi cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan terjadi ketika Raka memecah hambatan menjadi tindakan yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
