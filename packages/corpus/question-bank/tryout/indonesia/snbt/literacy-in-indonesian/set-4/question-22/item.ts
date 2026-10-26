import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nisa memilih untuk mencatat rute yang sulit dan mengusulkan tanda yang bisa dibaca dari kursi roda. Tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          correct: false,
          label:
            "Nisa memilih untuk mencatat rute yang sulit dan mengusulkan tanda yang bisa dibaca dari kursi roda. Perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          correct: true,
          label:
            "Mencatat rute sulit dari posisi kursi roda membuat usulan Nisa bertumpu pada hambatan yang dapat ditunjukkan, bukan asumsi tentang akses.",
        },
        {
          correct: false,
          label:
            "Nisa memilih untuk mencatat rute yang sulit dan mengusulkan tanda yang bisa dibaca dari kursi roda. Latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          correct: false,
          label:
            "Nisa memilih untuk mencatat rute yang sulit dan mengusulkan tanda yang bisa dibaca dari kursi roda. Definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
      ],
    },
  },
};

export default item;
