import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "old-uniform",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kesal karena Pak Sunu membuka rahasia Damar di depan kelas",
        },
        {
          correct: false,
          label: "geli karena Pak Sunu salah membaca nama di kerah",
        },
        { correct: false, label: "takut karena Pak Sunu akan menghukum Damar" },
        {
          correct: false,
          label: "cemburu karena Galih lebih pintar daripada Damar",
        },
        {
          correct: true,
          label:
            "terharu karena Pak Sunu mengubah noda yang memalukan menjadi tanda kerja keras",
        },
      ],
    },
  },
};

export default item;
