import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bagian awal menetapkan waktu kegiatan pasar, lalu bagian berikutnya menjelaskan cara menyebarluaskan hasil yang sudah pasti.",
        },
        {
          correct: true,
          label:
            "Perbedaan awal mendorong pemeriksaan sumber, lalu hasil pemeriksaan menentukan cara museum menulis label secara transparan.",
        },
        {
          correct: false,
          label:
            "Bagian awal membandingkan rencana digitalisasi, lalu bagian berikutnya memilih sumber yang paling mudah disimpan.",
        },
        {
          correct: false,
          label:
            "Bagian awal mengumpulkan kesaksian, lalu bagian berikutnya mengganti dokumen tertulis dengan versi mayoritas narasumber.",
        },
        {
          correct: false,
          label:
            "Bagian awal menilai daya tarik cerita, lalu bagian berikutnya merancang label untuk mengurangi jumlah rincian sejarah.",
        },
      ],
    },
  },
};

export default item;
