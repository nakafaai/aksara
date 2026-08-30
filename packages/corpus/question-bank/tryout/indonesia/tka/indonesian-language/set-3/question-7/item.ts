import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Laras membeli tinta merah baru",
        },
        {
          isCorrect: false,
          label: "ibu Laras mencetak banyak peta",
        },
        {
          isCorrect: false,
          label: "warga menolak menjawab pertanyaan Laras",
        },
        {
          isCorrect: false,
          label: "lapangan dipindahkan ke selatan",
        },
        {
          isCorrect: true,
          label:
            "Laras memeriksa hambatan dan menemukan jalur alternatif yang lebih dapat diakses",
        },
      ],
    },
  },
  stimulusKey: "mapmakers-ink",
};

export default item;
