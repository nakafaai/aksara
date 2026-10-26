import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "repair-clinic",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menandai tahap mencari penyebab berdasarkan gejala dan pengujian sebelum tindakan perbaikan dipilih",
        },
        {
          correct: false,
          label:
            "menyamakan pemeriksaan awal dengan keputusan untuk mengganti seluruh komponen",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa keberhasilan perbaikan dapat dipastikan sebelum benda diuji",
        },
        {
          correct: false,
          label:
            "menjelaskan proses menjual benda yang biaya perbaikannya belum dihitung",
        },
        {
          correct: false,
          label:
            "menegaskan bahwa catatan gejala tidak diperlukan jika kerusakan tampak dari luar",
        },
      ],
    },
  },
};

export default item;
