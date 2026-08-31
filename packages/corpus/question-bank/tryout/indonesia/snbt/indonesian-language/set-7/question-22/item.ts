import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Arum memilih untuk bertanya kepada petugas, lalu menggambar ulang alur dengan bahasa yang sederhana; tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          isCorrect: true,
          label:
            "Bertanya kepada petugas sebelum menggambar ulang alur membuat penyederhanaan Arum tetap terikat pada proses layanan yang sebenarnya.",
        },
        {
          isCorrect: false,
          label:
            "Arum memilih untuk bertanya kepada petugas, lalu menggambar ulang alur dengan bahasa yang sederhana; perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          isCorrect: false,
          label:
            "Arum memilih untuk bertanya kepada petugas, lalu menggambar ulang alur dengan bahasa yang sederhana; latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Arum memilih untuk bertanya kepada petugas, lalu menggambar ulang alur dengan bahasa yang sederhana; definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
