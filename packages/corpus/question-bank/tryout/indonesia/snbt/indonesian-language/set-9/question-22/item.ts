import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Laras memilih untuk memilih jalur pendek, menyimpan ponsel, dan mencatat tiga suara yang ia dengar; tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Laras memilih untuk memilih jalur pendek, menyimpan ponsel, dan mencatat tiga suara yang ia dengar; perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          isCorrect: true,
          label:
            "Jalur pendek, ponsel yang disimpan, dan tiga suara tercatat memberi Laras tugas pengamatan yang terbatas serta dapat dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Laras memilih untuk memilih jalur pendek, menyimpan ponsel, dan mencatat tiga suara yang ia dengar; latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Laras memilih untuk memilih jalur pendek, menyimpan ponsel, dan mencatat tiga suara yang ia dengar; definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
