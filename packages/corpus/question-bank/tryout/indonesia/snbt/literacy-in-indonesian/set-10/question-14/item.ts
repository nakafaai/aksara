import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menjadikan nama taman sebagai bukti bahwa alat dan informasinya sudah dapat digunakan semua anak.",
        },
        {
          correct: true,
          label:
            "Mendorong tim menilai keragaman sejak tahap perancangan dan membedakan perbaikan informasi dari akses nyata terhadap alat bermain.",
        },
        {
          correct: false,
          label:
            "Membatasi evaluasi pada keluarga yang telah melaporkan kebutuhan karena kelompok lain tidak termasuk pengguna desain inklusif.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa solusi tambahan selalu keliru meskipun hambatan baru ditemukan setelah taman digunakan.",
        },
        {
          correct: false,
          label:
            "Mengubah keberhasilan menemukan alat menjadi bukti bahwa alat tersebut aman dan menyenangkan digunakan.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
