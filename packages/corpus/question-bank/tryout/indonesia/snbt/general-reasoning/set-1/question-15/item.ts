import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setiap produk herbal berizin edar terbukti dapat menyembuhkan penyakit.",
        },
        {
          correct: true,
          label:
            "Peredaran dan penggunaan produk herbal bergantung pada penilaian regulator serta pengawasan yang berkelanjutan.",
        },
        {
          correct: false,
          label:
            "Izin edar menjamin bahwa suatu produk herbal cocok untuk setiap orang dan setiap kondisi.",
        },
        {
          correct: false,
          label:
            "Konsumen tidak perlu lagi memeriksa label setelah suatu produk herbal memperoleh izin edar.",
        },
        {
          correct: false,
          label:
            "Pengawasan pemerintah berakhir begitu suatu produk herbal memperoleh izin edar.",
        },
      ],
    },
  },
};

export default item;
