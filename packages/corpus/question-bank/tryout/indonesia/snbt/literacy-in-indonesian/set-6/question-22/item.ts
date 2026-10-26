import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sari memilih untuk mengubah tujuan pertemuan dari mengejar jumlah soal menjadi memahami satu konsep. Tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          correct: true,
          label:
            "Mengurangi bantuan pada tiap soal memberi Dimas ruang mengambil alih penalaran, sehingga Sari beralih dari pemberi langkah menjadi perancang dukungan sementara.",
        },
        {
          correct: false,
          label:
            "Sari memilih untuk mengubah tujuan pertemuan dari mengejar jumlah soal menjadi memahami satu konsep. Perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          correct: false,
          label:
            "Sari memilih untuk mengubah tujuan pertemuan dari mengejar jumlah soal menjadi memahami satu konsep. Latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          correct: false,
          label:
            "Sari memilih untuk mengubah tujuan pertemuan dari mengejar jumlah soal menjadi memahami satu konsep. Definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
