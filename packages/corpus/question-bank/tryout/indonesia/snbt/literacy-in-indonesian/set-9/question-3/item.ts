import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Mengacak urutan pemasangan panel, mengulang nada pada beberapa posisi mikrofon dan beberapa ruang, lalu membandingkan tingkat bunyi serta waktu dengung pada setiap kondisi.",
        },
        {
          isCorrect: false,
          label:
            "Menambah jumlah panel sambil menaikkan volume pengeras suara agar selisih desibel lebih besar dan lebih mudah terlihat.",
        },
        {
          isCorrect: false,
          label:
            "Memilih hanya posisi mikrofon yang menghasilkan penurunan terbesar, kemudian mengulang pengukuran pada posisi tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Mengganti tiga nada uji dengan musik yang berbeda pada setiap kondisi tanpa mencatat tingkat bunyi awalnya.",
        },
        {
          isCorrect: false,
          label:
            "Menanyakan pendapat pendengar tentang kenyamanan ruang tanpa mengulang pengukuran akustik yang menjadi dasar dugaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
