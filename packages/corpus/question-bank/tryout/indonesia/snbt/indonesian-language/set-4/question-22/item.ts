import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nisa memilih untuk mencatat rute yang sulit dan mengusulkan tanda yang bisa dibaca dari kursi roda; tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Nisa memilih untuk mencatat rute yang sulit dan mengusulkan tanda yang bisa dibaca dari kursi roda; perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          isCorrect: true,
          label:
            "Mencatat rute sulit dari posisi kursi roda membuat usulan Nisa bertumpu pada hambatan yang dapat ditunjukkan, bukan asumsi tentang akses.",
        },
        {
          isCorrect: false,
          label:
            "Nisa memilih untuk mencatat rute yang sulit dan mengusulkan tanda yang bisa dibaca dari kursi roda; latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Nisa memilih untuk mencatat rute yang sulit dan mengusulkan tanda yang bisa dibaca dari kursi roda; definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
