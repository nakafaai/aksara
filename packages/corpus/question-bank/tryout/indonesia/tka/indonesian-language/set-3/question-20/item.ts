import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "marah karena Ayu mengambil partitur Rafi tanpa memahami dukungan yang sedang ia perlukan",
        },
        {
          isCorrect: false,
          label:
            "takut karena penghentian konser membuat hubungan kedua tokoh berakhir tanpa penyelesaian",
        },
        {
          isCorrect: false,
          label:
            "kecewa karena kerusakan klarinet menghalangi kedua tokoh menyampaikan dukungan melalui musik",
        },
        {
          isCorrect: true,
          label:
            "hangat karena keduanya saling memahami bentuk dukungan yang tidak diucapkan",
        },
        {
          isCorrect: false,
          label:
            "bingung karena orkes tidak membungkuk sehingga respons kedua tokoh pada akhir cerita tidak dapat ditafsirkan",
        },
      ],
    },
  },
  stimulusKey: "empty-measure",
};

export default item;
