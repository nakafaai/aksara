import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bagaimana cara mengambil buah ceri dengan pohon berduri?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Mengapa buah ceri rasanya enak sekali?" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Mengapa Enjin dan Ensi belum datang?" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Mengapa siput bisa berjalan di atas duri?" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kenapa pohon ceri berduri?" }],
        },
      ],
    },
  },
};

export default item;
