import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "bandung-conference",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mereka ingin bergabung dengan blok yang dipimpin Amerika Serikat.",
        },
        {
          correct: false,
          label: "Mereka diundang oleh Uni Soviet untuk membahas Eropa Timur.",
        },
        {
          correct: false,
          label: "Mereka ingin membangun museum bersama di kota Bandung.",
        },
        {
          correct: true,
          label:
            "Mereka ingin bekerja sama tanpa bergantung pada blok mana pun.",
        },
        {
          correct: false,
          label:
            "Mereka ingin membagi wilayah Afrika di antara negara-negara Asia yang hadir.",
        },
      ],
    },
  },
};

export default item;
