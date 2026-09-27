import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan dua cara pembayaran pada pengguna yang setara, lalu bagian berikutnya memperluas hasil itu ke seluruh pasar.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal memutuskan penghapusan jalur digital, lalu bagian berikutnya hanya merinci jadwal perbaikan jaringan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menemukan keunggulan pada belanja besar, lalu bagian berikutnya menjelaskan perluasan digital untuk kelompok tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menyajikan keberatan pengguna, lalu bagian berikutnya mengatasinya dengan mewajibkan kepemilikan perangkat digital.",
        },
        {
          isCorrect: true,
          label:
            "Data awal memunculkan usulan kebijakan, lalu pemisahan data mengungkap batas usulan dan mengarahkan keputusan campuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
