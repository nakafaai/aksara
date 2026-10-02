import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan waktu kegiatan pasar, lalu bagian berikutnya menjelaskan cara menyebarluaskan hasil yang sudah pasti.",
        },
        {
          isCorrect: true,
          label:
            "Perbedaan awal mendorong pemeriksaan sumber, lalu hasil pemeriksaan menentukan cara museum menulis label secara transparan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan rencana digitalisasi, lalu bagian berikutnya memilih sumber yang paling mudah disimpan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal mengumpulkan kesaksian, lalu bagian berikutnya mengganti dokumen tertulis dengan versi mayoritas narasumber.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menilai daya tarik cerita, lalu bagian berikutnya merancang label untuk mengurangi jumlah rincian sejarah.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
