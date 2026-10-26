import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kedua sumber membantu menjelaskan fungsi bangunan pada masa yang berbeda. Perbedaan bentuk membuktikan bahwa salah satu sumber tidak dapat digunakan.",
        },
        {
          correct: true,
          label:
            "Denah dan wawancara sama-sama membantu melacak fungsi bangunan, tetapi perubahan ruang tidak identik dengan pengalaman dua mantan penghuni.",
        },
        {
          correct: false,
          label:
            "Karena membahas peristiwa yang sama, kedua sumber pasti mempunyai sudut pandang dan tujuan yang sama.",
        },
        {
          correct: false,
          label:
            "Menggabungkan dua sumber memberi izin untuk mengisi bagian yang hilang dengan dugaan yang masuk akal.",
        },
        {
          correct: false,
          label:
            "Perbedaan antarsumber hanya berkaitan dengan pilihan kata dan tidak memengaruhi simpulan.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
