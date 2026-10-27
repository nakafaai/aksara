import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Minum teh hijau setiap hari terbukti mampu menghilangkan jerawat.",
        },
        {
          correct: false,
          label:
            "Studi klinis telah membuktikan bahwa teh hijau mencegah semua bentuk kerusakan kulit akibat UV.",
        },
        {
          correct: false,
          label:
            "Minum teh hijau terbukti dapat menggantikan perlindungan matahari yang sudah mapan.",
        },
        {
          correct: true,
          label:
            "Teh hijau oral sedang diteliti untuk kemungkinan efek pada kulit, tetapi buktinya belum cukup untuk menjanjikan bahwa teh hijau mengatasi jerawat atau mencegah penuaan akibat cahaya.",
        },
        {
          correct: false,
          label:
            "Suplemen ekstrak teh hijau pekat terbukti aman untuk semua orang karena berasal dari tumbuhan.",
        },
      ],
    },
  },
};

export default item;
