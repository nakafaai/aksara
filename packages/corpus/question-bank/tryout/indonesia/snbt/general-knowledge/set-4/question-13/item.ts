import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Konflik antara kesederhanaan dan ingatan lokal dijawab dengan pemeriksaan bukti serta pembagian fungsi nama.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menemukan tiga mata air berbeda, lalu bagian berikutnya memberi nama administrasi yang sama kepada ketiganya.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menimbang nama yang paling populer, lalu bagian berikutnya memilih satu nama berdasarkan jumlah pendukung.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan semua nama setara untuk dokumen resmi, lalu bagian berikutnya menghapus bukti yang bertentangan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal mengusulkan pelestarian nama lokal, lalu bagian berikutnya menolaknya agar pencarian memakai satu nama saja.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
