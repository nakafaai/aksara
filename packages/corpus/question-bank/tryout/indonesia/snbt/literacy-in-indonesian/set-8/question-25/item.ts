import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "thomas-cup-1958",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penulis menolak cerita itu sepenuhnya, karena semangat tidak berperan dalam kemenangan 1958.",
        },
        {
          correct: false,
          label:
            "Penulis menerima cerita itu sepenuhnya, karena Indonesia memang negara muda yang serba kekurangan pada masa itu.",
        },
        {
          correct: false,
          label:
            "Penulis tidak menilai cerita itu dan hanya melaporkannya sebagai pendapat sebagian orang.",
        },
        {
          correct: true,
          label:
            "Penulis mengakui cerita itu menyentuh, tetapi menilainya tidak lengkap karena melewatkan pembinaan di tingkat klub.",
        },
        {
          correct: false,
          label:
            "Penulis menganggap cerita itu sengaja dikarang untuk menutupi peran para pengusaha dalam pembinaan bulu tangkis.",
        },
      ],
    },
  },
};

export default item;
