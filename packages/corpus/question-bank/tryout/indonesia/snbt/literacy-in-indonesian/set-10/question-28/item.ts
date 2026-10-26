import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nara menganggap semua keterangan warga lebih tepat daripada data kantor kampung.",
        },
        {
          correct: false,
          label:
            "Nara yakin gang menuju sungai gelap, tetapi menunda menuliskannya sampai mendapat izin petugas.",
        },
        {
          correct: false,
          label:
            "Nara mempertahankan banyak lapisan karena keadaan lampu tidak mungkin pernah dipahami dengan baik.",
        },
        {
          correct: true,
          label:
            "Nara memperlakukan peta sebagai pengetahuan sementara: bagian yang belum diamati tidak boleh dianggap sudah diketahui, dan laporan yang berubah perlu tetap memiliki konteks.",
        },
        {
          correct: false,
          label:
            "Nara menolak membuat simpulan apa pun selama seluruh warga belum memberikan catatan pada peta.",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
