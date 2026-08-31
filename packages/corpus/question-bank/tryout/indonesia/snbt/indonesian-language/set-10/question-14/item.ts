import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Menjadikan nama taman sebagai bukti bahwa alat dan informasinya sudah dapat digunakan semua anak.",
        },
        {
          isCorrect: true,
          label:
            "Mendorong tim menilai keragaman sejak tahap perancangan dan membedakan perbaikan informasi dari akses nyata terhadap alat bermain.",
        },
        {
          isCorrect: false,
          label:
            "Membatasi evaluasi pada keluarga yang telah melaporkan kebutuhan karena kelompok lain tidak termasuk pengguna desain inklusif.",
        },
        {
          isCorrect: false,
          label:
            "Membuktikan bahwa solusi tambahan selalu keliru meskipun hambatan baru ditemukan setelah taman digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Mengubah keberhasilan menemukan alat menjadi bukti bahwa alat tersebut aman dan menyenangkan digunakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
