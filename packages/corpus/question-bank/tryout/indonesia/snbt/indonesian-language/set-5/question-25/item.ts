import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengirim Semua Kotak agar Target Terlihat Selesai",
        },
        {
          isCorrect: false,
          label: "Menyembunyikan Ketidakcocokan Label Setelah Kapal Berangkat",
        },
        {
          isCorrect: true,
          label: "Menahan Dua Kotak: Akuntabilitas Bima di Gudang Pelabuhan",
        },
        {
          isCorrect: false,
          label:
            "Akuntabilitas sebagai Definisi Tanpa Tindakan yang Dapat Diperiksa",
        },
        {
          isCorrect: false,
          label: "Delapan Belas Kotak sebagai Satu-satunya Ukuran Kepemimpinan",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
