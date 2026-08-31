import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "karena transkrip hanya diberikan kepada kelompok yang memperoleh hasil pemahaman terendah",
        },
        {
          isCorrect: false,
          label:
            "karena penghilangan transkrip diperlukan agar pengaruh earphone terlihat lebih besar",
        },
        {
          isCorrect: true,
          label:
            "karena transkrip dipertahankan sebagai akses dasar bagi semua kelompok, sedangkan earphone dan penamaanlah yang dibedakan untuk diuji",
        },
        {
          isCorrect: false,
          label:
            "karena transkrip dianggap hasil pengujian, bukan bagian dari kondisi yang dialami peserta",
        },
        {
          isCorrect: false,
          label:
            "karena semua unsur audio harus diubah sekaligus agar kedua kelompok benar-benar berbeda",
        },
      ],
    },
  },
  stimulusKey: "audio-labels",
};

export default item;
