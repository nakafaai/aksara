import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Peta baru membantu sebagian kelompok menemukan alat, tetapi hasil yang tidak merata dan batas peserta menunjukkan bahwa akses informasi belum sama dengan desain alat yang inklusif.",
        },
        {
          correct: false,
          label:
            "Peta baru sudah membuat taman inklusif karena setiap kelompok memiliki setidaknya satu keluarga yang berhasil menemukan alat.",
        },
        {
          correct: false,
          label:
            "Perubahan kecil pada kelompok sensorik membuktikan keluarga dalam kelompok itu tidak membutuhkan informasi kebisingan.",
        },
        {
          correct: false,
          label:
            "Keberhasilan kelompok tanpa kebutuhan akses dapat dipakai untuk menyimpulkan bahwa semua alat mudah digunakan oleh semua anak.",
        },
        {
          correct: false,
          label:
            "Karena peta lama dan baru diuji pada jam sebanding, peta baru tidak lagi memerlukan pengujian bersama kelompok lain.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
