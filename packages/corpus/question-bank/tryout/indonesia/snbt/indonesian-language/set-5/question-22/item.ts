import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dengan membagi pemeriksaan dan menahan dua kotak yang meragukan, Bima beralih dari mengejar hasil lengkap menuju koordinasi yang dapat dipertanggungjawabkan.",
        },
        {
          isCorrect: false,
          label:
            "Bima memilih untuk membagi tugas berdasarkan waktu luang dan mencatat alasan setiap perubahan; tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Bima memilih untuk membagi tugas berdasarkan waktu luang dan mencatat alasan setiap perubahan; perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          isCorrect: false,
          label:
            "Bima memilih untuk membagi tugas berdasarkan waktu luang dan mencatat alasan setiap perubahan; latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Bima memilih untuk membagi tugas berdasarkan waktu luang dan mencatat alasan setiap perubahan; definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
