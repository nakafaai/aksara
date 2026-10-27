import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Plak yang tidak dibersihkan dapat mengeras menjadi karang gigi.",
        },
        {
          correct: false,
          label: "Karang gigi di bawah garis gusi dapat mengiritasi gusi.",
        },
        {
          correct: false,
          label:
            "Gusi merah, bengkak, atau berdarah dapat menjadi tanda gingivitis.",
        },
        {
          correct: true,
          label:
            "Setiap kasus gusi bengkak hanya disebabkan oleh plak atau karang gigi.",
        },
        {
          correct: false,
          label:
            "Tenaga kesehatan gigi harus membersihkan karang gigi yang sudah terbentuk.",
        },
      ],
    },
  },
};

export default item;
