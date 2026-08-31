import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dito memilih untuk mengulang pengukuran pada jam yang sama dan menandai catatan yang meragukan; tindakan itu menyelesaikan seluruh konflik secara langsung sehingga langkah lanjutan tidak diperlukan.",
        },
        {
          isCorrect: true,
          label:
            "Pengukuran ulang pada jam yang sama dan penandaan data meragukan membuat Dito memisahkan pola dari ketidakpastian catatan.",
        },
        {
          isCorrect: false,
          label:
            "Dito memilih untuk mengulang pengukuran pada jam yang sama dan menandai catatan yang meragukan; perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          isCorrect: false,
          label:
            "Dito memilih untuk mengulang pengukuran pada jam yang sama dan menandai catatan yang meragukan; latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Dito memilih untuk mengulang pengukuran pada jam yang sama dan menandai catatan yang meragukan; definisi istilah pada akhir bacaan sudah cukup menjelaskan perkembangan tokoh tanpa bukti dari tindakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
