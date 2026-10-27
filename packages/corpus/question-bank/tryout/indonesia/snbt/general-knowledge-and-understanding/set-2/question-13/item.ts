import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ketika hujan turun, jalan menjadi basah.",
        },
        {
          correct: false,
          label: "Jika makan malam sudah siap, anak-anak dapat makan.",
        },
        {
          correct: false,
          label: "Sebelum matahari terbit, burung berkicau nyaring.",
        },
        {
          correct: true,
          label:
            "Setelah pelajaran berakhir, setiap siswa harus segera menyerahkan tugas.",
        },
        {
          correct: false,
          label: "Ketika bel berbunyi, lorong sekolah menjadi ramai.",
        },
      ],
    },
  },
};

export default item;
