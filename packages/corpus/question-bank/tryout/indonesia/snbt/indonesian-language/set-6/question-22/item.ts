import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sari memilih untuk mengubah tujuan pertemuan dari mengejar bab menjadi memahami satu konsep; tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          isCorrect: true,
          label:
            "Mengurangi bantuan pada tiap soal memberi Dimas ruang mengambil alih penalaran, sehingga Sari beralih dari pemberi langkah menjadi perancang dukungan sementara.",
        },
        {
          isCorrect: false,
          label:
            "Sari memilih untuk mengubah tujuan pertemuan dari mengejar bab menjadi memahami satu konsep; perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          isCorrect: false,
          label:
            "Sari memilih untuk mengubah tujuan pertemuan dari mengejar bab menjadi memahami satu konsep; latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Sari memilih untuk mengubah tujuan pertemuan dari mengejar bab menjadi memahami satu konsep; definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
