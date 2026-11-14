import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "silat-club",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pencak silat hanya mengajarkan cara memenangi pertandingan",
        },
        {
          correct: false,
          label:
            "setiap latihan pencak silat selalu dibuka dengan pertandingan",
        },
        {
          correct: true,
          label:
            "pencak silat mengajarkan nilai hormat dan kendali diri, bukan hanya teknik membela diri",
        },
        { correct: false, label: "siswa dilarang berlatih secara berpasangan" },
        {
          correct: false,
          label:
            "UNESCO menetapkan pencak silat sebagai warisan budaya takbenda",
        },
      ],
    },
  },
};

export default item;
