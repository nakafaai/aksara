import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kedua sumber membantu menjelaskan fungsi bangunan pada masa yang berbeda; perbedaan bentuk membuktikan bahwa salah satu sumber tidak dapat digunakan.",
        },
        {
          isCorrect: true,
          label:
            "Denah dan wawancara sama-sama membantu melacak fungsi bangunan, tetapi perubahan ruang tidak identik dengan pengalaman dua mantan penghuni.",
        },
        {
          isCorrect: false,
          label:
            "Karena membahas peristiwa yang sama, kedua sumber pasti mempunyai sudut pandang dan tujuan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Menggabungkan dua sumber memberi izin untuk mengisi bagian yang hilang dengan dugaan yang masuk akal.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan antarsumber hanya berkaitan dengan pilihan kata dan tidak memengaruhi simpulan.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
