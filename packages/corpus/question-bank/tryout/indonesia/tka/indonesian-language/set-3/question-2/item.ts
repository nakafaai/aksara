import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "audio-labels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "karena transkrip hanya diberikan kepada kelompok yang memperoleh hasil pemahaman terendah",
        },
        {
          correct: false,
          label:
            "karena penghilangan transkrip diperlukan agar pengaruh earphone terlihat lebih besar",
        },
        {
          correct: true,
          label:
            "karena transkrip tetap dapat diakses semua kelompok, sedangkan pemberian earphone dibedakan dengan penamaan audio yang dibuat sama",
        },
        {
          correct: false,
          label:
            "karena transkrip dianggap hasil pengujian, bukan bagian dari kondisi yang dialami peserta",
        },
        {
          correct: false,
          label:
            "karena semua unsur audio harus diubah sekaligus agar kedua kelompok benar-benar berbeda",
        },
      ],
    },
  },
};

export default item;
