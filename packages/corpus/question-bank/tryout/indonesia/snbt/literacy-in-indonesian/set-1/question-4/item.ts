import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "sleep-memory",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tikus yang pemutaran ulangnya di hipokampus dihentikan secara khusus selama tidur tetap mengingat jalur labirin sama baiknya dengan tikus yang tidak diganggu.",
        },
        {
          correct: false,
          label:
            "Tikus yang kurang tidur setelah belajar lebih lambat menemukan jalur labirin keesokan harinya.",
        },
        {
          correct: false,
          label:
            "Pemutaran ulang pada tikus berlangsung beberapa kali lebih cepat daripada urutan aslinya saat menjelajah labirin.",
        },
        {
          correct: false,
          label:
            "Pada manusia, aktivitas hipokampus juga meningkat selama tidur gelombang lambat setelah kegiatan belajar.",
        },
        {
          correct: false,
          label:
            "Tidur siang yang singkat menghasilkan keuntungan ingatan yang lebih kecil daripada tidur semalam penuh.",
        },
      ],
    },
  },
};

export default item;
