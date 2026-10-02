import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Peta baru membantu sebagian kelompok menemukan alat, tetapi hasil yang tidak merata dan batas peserta menunjukkan bahwa akses informasi belum sama dengan desain alat yang inklusif.",
        },
        {
          isCorrect: false,
          label:
            "Peta baru sudah membuat taman inklusif karena setiap kelompok memiliki setidaknya satu keluarga yang berhasil menemukan alat.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan kecil pada kelompok sensorik membuktikan keluarga dalam kelompok itu tidak membutuhkan informasi kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Keberhasilan kelompok tanpa kebutuhan akses dapat dipakai untuk menyimpulkan bahwa semua alat mudah digunakan oleh semua anak.",
        },
        {
          isCorrect: false,
          label:
            "Karena peta lama dan baru diuji pada jam sebanding, peta baru tidak lagi memerlukan pengujian bersama kelompok lain.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
