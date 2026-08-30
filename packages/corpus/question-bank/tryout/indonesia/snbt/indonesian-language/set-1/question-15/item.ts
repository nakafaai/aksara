import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Warna jingga yang tampak di langit" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Saat matahari tepat menyentuh cakrawala" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tanda bahwa seluruh kegiatan harus berakhir",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Waktu setengah gelap setelah matahari terbenam",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Suasana yang selalu tenang dan damai" },
          ],
        },
      ],
    },
  },
};

export default item;
