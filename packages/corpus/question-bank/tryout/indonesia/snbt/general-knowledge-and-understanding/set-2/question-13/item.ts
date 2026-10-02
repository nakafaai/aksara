import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ketika hujan turun, jalan menjadi basah.",
        },
        {
          isCorrect: false,
          label: "Jika makan malam sudah siap, anak-anak dapat makan.",
        },
        {
          isCorrect: false,
          label: "Sebelum matahari terbit, burung berkicau nyaring.",
        },
        {
          isCorrect: true,
          label:
            "Setelah pelajaran berakhir, setiap siswa harus segera menyerahkan tugas.",
        },
        {
          isCorrect: false,
          label: "Ketika bel berbunyi, lorong sekolah menjadi ramai.",
        },
      ],
    },
  },
};

export default item;
