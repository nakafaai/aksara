import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bagaimana cara mengambil buah ceri dengan pohon berduri?",
        },
        {
          correct: false,
          label: "Mengapa buah ceri rasanya enak sekali?",
        },
        {
          correct: false,
          label: "Mengapa Enjin dan Ensi belum datang?",
        },
        {
          correct: true,
          label: "Mengapa siput bisa berjalan di atas duri?",
        },
        {
          correct: false,
          label: "Kenapa pohon ceri berduri?",
        },
      ],
    },
  },
};

export default item;
