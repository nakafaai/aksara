import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Poster lebih kuat untuk mengetahui pengalaman pengunjung karena berasal dari lima kota, sedangkan buku tamu hanya berasal dari dua kota.",
        },
        {
          correct: false,
          label:
            "Buku tamu lebih kuat untuk mengetahui keberhasilan pameran secara keseluruhan karena memuat $$240$$ catatan setelah kunjungan.",
        },
        {
          correct: false,
          label:
            "Kesamaan topik membuat poster dan buku tamu dapat digabungkan tanpa membedakan siapa pembuat dan kapan keduanya dibuat.",
        },
        {
          correct: false,
          label:
            "Keluhan pada buku tamu membuktikan bahwa slogan pada poster dibuat untuk menutupi masalah akses yang sudah diketahui penyelenggara.",
        },
        {
          correct: true,
          label:
            "Poster mendukung simpulan tentang citra yang ingin dibangun di lima kota, sedangkan buku tamu mendukung simpulan tentang sebagian pengalaman yang dicatat secara sukarela di dua kota.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
