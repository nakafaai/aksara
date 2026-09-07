import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Raka memilih untuk menyusun daftar tiga langkah kecil dan meminta satu teman mengecek kemajuannya. Tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Raka memilih untuk menyusun daftar tiga langkah kecil dan meminta satu teman mengecek kemajuannya. Perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          isCorrect: false,
          label:
            "Raka memilih untuk menyusun daftar tiga langkah kecil dan meminta satu teman mengecek kemajuannya. Latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Raka memilih untuk menyusun daftar tiga langkah kecil dan meminta satu teman mengecek kemajuannya. Definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
        {
          isCorrect: true,
          label:
            "Daftar tiga langkah dan pemeriksaan teman mengubah tumpukan tugas Raka menjadi urutan yang dapat diamati tanpa berpura-pura bahwa seluruh masalah sudah selesai.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
