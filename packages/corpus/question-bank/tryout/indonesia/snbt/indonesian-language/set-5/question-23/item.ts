import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam gudang kecil dekat pelabuhan pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang gudang kecil dekat pelabuhan tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang akuntabilitas cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan terjadi ketika Bima memecah hambatan menjadi tindakan yang dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
