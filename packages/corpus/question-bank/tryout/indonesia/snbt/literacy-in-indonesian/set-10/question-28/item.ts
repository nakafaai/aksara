import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nara menganggap semua keterangan warga lebih tepat daripada data kantor kampung.",
        },
        {
          isCorrect: false,
          label:
            "Nara yakin gang menuju sungai gelap, tetapi menunda menuliskannya sampai mendapat izin petugas.",
        },
        {
          isCorrect: false,
          label:
            "Nara mempertahankan banyak lapisan karena keadaan lampu tidak mungkin pernah dipahami dengan baik.",
        },
        {
          isCorrect: true,
          label:
            "Nara memperlakukan peta sebagai pengetahuan sementara: bagian yang belum diamati tidak boleh dianggap sudah diketahui, dan laporan yang berubah perlu tetap memiliki konteks.",
        },
        {
          isCorrect: false,
          label:
            "Nara menolak membuat simpulan apa pun selama seluruh warga belum memberikan catatan pada peta.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
