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
          isCorrect: true,
          label:
            "menandai tahap mencari penyebab berdasarkan gejala dan pengujian sebelum tindakan perbaikan dipilih",
        },
        {
          isCorrect: false,
          label:
            "menyamakan pemeriksaan awal dengan keputusan untuk mengganti seluruh komponen",
        },
        {
          isCorrect: false,
          label:
            "menunjukkan bahwa keberhasilan perbaikan dapat dipastikan sebelum benda diuji",
        },
        {
          isCorrect: false,
          label:
            "menjelaskan proses menjual benda yang biaya perbaikannya belum dihitung",
        },
        {
          isCorrect: false,
          label:
            "menegaskan bahwa catatan gejala tidak diperlukan jika kerusakan tampak dari luar",
        },
      ],
    },
  },
  stimulusKey: "repair-clinic",
};

export default item;
