import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tari memilih untuk mengamati kebutuhan tiga anak sebelum memilih permainan kelompok; tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Tari memilih untuk mengamati kebutuhan tiga anak sebelum memilih permainan kelompok; perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          isCorrect: true,
          label:
            "Mengamati kebutuhan tiga anak sebelum memilih permainan membuat keputusan Tari berangkat dari peserta nyata, bukan gagasan umum tentang inklusi.",
        },
        {
          isCorrect: false,
          label:
            "Tari memilih untuk mengamati kebutuhan tiga anak sebelum memilih permainan kelompok; latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Tari memilih untuk mengamati kebutuhan tiga anak sebelum memilih permainan kelompok; definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
