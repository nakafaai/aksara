import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mengacak urutan pemasangan panel, mengulang nada pada beberapa posisi mikrofon dan beberapa ruang, lalu membandingkan tingkat bunyi serta waktu dengung pada setiap kondisi.",
        },
        {
          correct: false,
          label:
            "Menambah jumlah panel sambil menaikkan volume pengeras suara agar selisih desibel lebih besar dan lebih mudah terlihat.",
        },
        {
          correct: false,
          label:
            "Memilih hanya posisi mikrofon yang menghasilkan penurunan terbesar, kemudian mengulang pengukuran pada posisi tersebut.",
        },
        {
          correct: false,
          label:
            "Mengganti tiga nada uji dengan musik yang berbeda pada setiap kondisi tanpa mencatat tingkat bunyi awalnya.",
        },
        {
          correct: false,
          label:
            "Menanyakan pendapat pendengar tentang kenyamanan ruang tanpa mengulang pengukuran akustik yang menjadi dasar dugaan.",
        },
      ],
    },
  },
};

export default item;
