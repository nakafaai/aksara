import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "empty-measure",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "marah karena Ayu mengambil partitur Rafi tanpa memahami dukungan yang sedang ia perlukan",
        },
        {
          correct: false,
          label:
            "takut karena penghentian konser membuat hubungan kedua tokoh berakhir tanpa penyelesaian",
        },
        {
          correct: false,
          label:
            "kecewa karena kerusakan klarinet menghalangi kedua tokoh menyampaikan dukungan melalui musik",
        },
        {
          correct: true,
          label:
            "hangat karena keduanya saling memahami bentuk dukungan yang tidak diucapkan",
        },
        {
          correct: false,
          label:
            "bingung karena orkes tidak membungkuk sehingga respons kedua tokoh pada akhir cerita tidak dapat ditafsirkan",
        },
      ],
    },
  },
};

export default item;
