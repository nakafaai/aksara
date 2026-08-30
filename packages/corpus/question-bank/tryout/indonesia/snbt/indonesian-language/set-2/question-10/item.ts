import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Bagaimana cara mengambil buah ceri dengan pohon berduri?",
        },
        {
          isCorrect: true,
          label: "Mengapa siput bisa berjalan di atas duri?",
        },
        {
          isCorrect: false,
          label: "Mengapa buah ceri rasanya enak sekali?",
        },
        {
          isCorrect: false,
          label: "Mengapa Enjin dan Ensi belum datang?",
        },
        {
          isCorrect: false,
          label: "Kenapa pohon ceri berduri?",
        },
      ],
    },
  },
};

export default item;
