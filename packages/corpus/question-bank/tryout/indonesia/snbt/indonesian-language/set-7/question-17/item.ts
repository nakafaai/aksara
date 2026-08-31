import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Poster lebih kuat untuk mengetahui pengalaman pengunjung karena berasal dari lima kota, sedangkan buku tamu hanya berasal dari dua kota.",
        },
        {
          isCorrect: false,
          label:
            "Buku tamu lebih kuat untuk mengetahui keberhasilan pameran secara keseluruhan karena memuat 240 catatan setelah kunjungan.",
        },
        {
          isCorrect: false,
          label:
            "Kesamaan topik membuat poster dan buku tamu dapat digabungkan tanpa membedakan siapa pembuat dan kapan keduanya dibuat.",
        },
        {
          isCorrect: false,
          label:
            "Keluhan pada buku tamu membuktikan bahwa slogan pada poster dibuat untuk menutupi masalah akses yang sudah diketahui penyelenggara.",
        },
        {
          isCorrect: true,
          label:
            "Poster mendukung simpulan tentang citra yang ingin dibangun di lima kota, sedangkan buku tamu mendukung simpulan tentang sebagian pengalaman sukarela di dua kota.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
