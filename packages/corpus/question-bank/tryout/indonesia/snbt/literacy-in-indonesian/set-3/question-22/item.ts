import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Raka memilih untuk menyusun daftar tiga langkah kecil dan meminta satu teman mengecek kemajuannya. Tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          correct: false,
          label:
            "Raka memilih untuk menyusun daftar tiga langkah kecil dan meminta satu teman mengecek kemajuannya. Perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          correct: false,
          label:
            "Raka memilih untuk menyusun daftar tiga langkah kecil dan meminta satu teman mengecek kemajuannya. Latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          correct: false,
          label:
            "Raka memilih untuk menyusun daftar tiga langkah kecil dan meminta satu teman mengecek kemajuannya. Definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
        {
          correct: true,
          label:
            "Daftar tiga langkah dan pemeriksaan teman mengubah tumpukan tugas Raka menjadi urutan yang dapat diamati tanpa berpura-pura bahwa seluruh masalah sudah selesai.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
