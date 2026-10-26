import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Konflik antara kesederhanaan dan ingatan lokal dijawab dengan pemeriksaan bukti serta pembagian fungsi nama.",
        },
        {
          correct: false,
          label:
            "Bagian awal menemukan tiga mata air berbeda, lalu bagian berikutnya memberi nama administrasi yang sama kepada ketiganya.",
        },
        {
          correct: false,
          label:
            "Bagian awal menimbang nama yang paling populer, lalu bagian berikutnya memilih satu nama berdasarkan jumlah pendukung.",
        },
        {
          correct: false,
          label:
            "Bagian awal menetapkan semua nama setara untuk dokumen resmi, lalu bagian berikutnya menghapus bukti yang bertentangan.",
        },
        {
          correct: false,
          label:
            "Bagian awal mengusulkan pelestarian nama lokal, lalu bagian berikutnya menolaknya agar pencarian memakai satu nama saja.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
