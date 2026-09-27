import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Minum teh hijau setiap hari terbukti mampu menghilangkan jerawat.",
        },
        {
          isCorrect: false,
          label:
            "Studi klinis telah membuktikan bahwa teh hijau mencegah semua bentuk kerusakan kulit akibat UV.",
        },
        {
          isCorrect: false,
          label:
            "Minum teh hijau terbukti dapat menggantikan perlindungan matahari yang sudah mapan.",
        },
        {
          isCorrect: true,
          label:
            "Teh hijau oral sedang diteliti untuk kemungkinan efek pada kulit, tetapi buktinya belum cukup untuk menjanjikan bahwa teh hijau mengatasi jerawat atau mencegah penuaan akibat cahaya.",
        },
        {
          isCorrect: false,
          label:
            "Suplemen ekstrak teh hijau pekat terbukti aman untuk semua orang karena berasal dari tumbuhan.",
        },
      ],
    },
  },
};

export default item;
