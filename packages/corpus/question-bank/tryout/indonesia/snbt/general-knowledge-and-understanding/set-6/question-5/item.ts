import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "author-purpose",
  },
  stimulus: "karst",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menjelaskan secara rinci proses terbentuknya gua, dolina, dan sungai bawah tanah di kawasan karst",
        },
        {
          correct: false,
          label:
            "membandingkan kawasan karst dengan kawasan berbatu lain yang lebih mudah dikelola",
        },
        {
          correct: false,
          label:
            "mengajak warga berhenti memakai air sungai bawah tanah pada musim kemarau",
        },
        {
          correct: true,
          label:
            "mengingatkan bahwa kerusakan karst dapat terjadi di bawah permukaan sehingga harus diperhatikan",
        },
        {
          correct: false,
          label:
            "menceritakan sejarah penambangan batu kapur di kawasan Gunung Sewu sejak dahulu",
        },
      ],
    },
  },
};

export default item;
