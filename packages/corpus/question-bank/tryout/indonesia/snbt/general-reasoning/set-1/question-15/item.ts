import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap produk herbal berizin edar terbukti dapat menyembuhkan penyakit.",
        },
        {
          isCorrect: true,
          label:
            "Peredaran dan penggunaan produk herbal bergantung pada penilaian regulator serta pengawasan yang berkelanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Izin edar menjamin bahwa suatu produk herbal cocok untuk setiap orang dan setiap kondisi.",
        },
        {
          isCorrect: false,
          label:
            "Konsumen tidak perlu lagi memeriksa label setelah suatu produk herbal memperoleh izin edar.",
        },
        {
          isCorrect: false,
          label:
            "Pengawasan pemerintah berakhir begitu suatu produk herbal memperoleh izin edar.",
        },
      ],
    },
  },
};

export default item;
