import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: [{ kind: "text", text: "Guru" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Reporter" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Kepala Desa" }] },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ketua acara adat Festival Munara Beba Byak Karon",
            },
          ],
        },
        { isCorrect: false, label: [{ kind: "text", text: "Penyuluh" }] },
      ],
    },
  },
};

export default item;
