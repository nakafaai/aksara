import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bagian awal membandingkan dua cara pembayaran pada pengguna yang setara, lalu bagian berikutnya memperluas hasil itu ke seluruh pasar.",
        },
        {
          correct: false,
          label:
            "Bagian awal memutuskan penghapusan jalur digital, lalu bagian berikutnya hanya merinci jadwal perbaikan jaringan.",
        },
        {
          correct: false,
          label:
            "Bagian awal menemukan keunggulan pada belanja besar, lalu bagian berikutnya menjelaskan perluasan digital untuk kelompok tersebut.",
        },
        {
          correct: false,
          label:
            "Bagian awal menyajikan keberatan pengguna, lalu bagian berikutnya mengatasinya dengan mewajibkan kepemilikan perangkat digital.",
        },
        {
          correct: true,
          label:
            "Data awal memunculkan usulan kebijakan, lalu pemisahan data mengungkap batas usulan dan mengarahkan keputusan campuran.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
