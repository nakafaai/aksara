import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "testing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rasa lancar membuat kelompok itu merasa paling siap padahal ingatan satu minggunya paling rendah, sesuai penjelasan bahwa jawaban yang keliru dapat ikut teringat tanpa umpan balik.",
        },
        {
          correct: false,
          label:
            "Kelompok itu memang mengingat paling banyak setelah satu minggu, sehingga perkiraannya tepat, sesuai penjelasan bahwa membaca ulang memberi rasa lancar.",
        },
        {
          correct: false,
          label:
            "Rasa lancar membuat kelompok itu merasa paling siap padahal ingatan satu minggunya paling rendah, sesuai penjelasan bahwa latihan mengingat paling berguna jika diikuti umpan balik.",
        },
        {
          correct: false,
          label:
            "Perkiraan itu menunjukkan bahwa mahasiswa tahu cara belajar terbaik bagi dirinya, sesuai penjelasan bahwa setiap usaha mengingat memperkuat jalan menuju ingatan.",
        },
        {
          correct: true,
          label:
            "Rasa lancar membuat kelompok itu merasa paling siap padahal ingatan satu minggunya paling rendah, sesuai penjelasan bahwa membaca ulang memberi rasa lancar tetapi tidak melatih menarik kembali ingatan.",
        },
      ],
    },
  },
};

export default item;
