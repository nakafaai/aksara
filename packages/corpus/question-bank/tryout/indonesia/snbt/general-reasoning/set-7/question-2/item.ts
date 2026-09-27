import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Plak yang tidak dibersihkan dapat mengeras menjadi karang gigi.",
        },
        {
          isCorrect: false,
          label: "Karang gigi di bawah garis gusi dapat mengiritasi gusi.",
        },
        {
          isCorrect: false,
          label:
            "Gusi merah, bengkak, atau berdarah dapat menjadi tanda gingivitis.",
        },
        {
          isCorrect: true,
          label:
            "Setiap kasus gusi bengkak hanya disebabkan oleh plak atau karang gigi.",
        },
        {
          isCorrect: false,
          label:
            "Tenaga kesehatan gigi harus membersihkan karang gigi yang sudah terbentuk.",
        },
      ],
    },
  },
};

export default item;
