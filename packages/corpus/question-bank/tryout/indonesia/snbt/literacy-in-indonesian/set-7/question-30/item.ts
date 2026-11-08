import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "waste-meeting",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "ingin segera menyerahkan urusan sampah kepada kelurahan",
        },
        {
          correct: true,
          label:
            "mengajak warga mencoba dulu dan menilai hasilnya bersama-sama",
        },
        {
          correct: false,
          label:
            "tidak yakin pada hitungannya sendiri tentang isi kantong sampah",
        },
        {
          correct: false,
          label: "ingin memaksa semua warga memilah sampah tanpa pengecualian",
        },
        {
          correct: false,
          label:
            "mungkin berniat menunda keputusan sampai Pak Hasan pindah rumah",
        },
      ],
    },
  },
};

export default item;
