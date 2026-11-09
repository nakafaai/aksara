import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "analogy",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Seperti di Kota P, kemacetan di persimpangan tersibuk Kota Q terutama disebabkan oleh kendaraan yang melintas lurus.",
        },
        {
          correct: false,
          label:
            "Kota Q dan Kota P sama-sama memiliki taman kota di dekat persimpangan tersibuknya.",
        },
        {
          correct: false,
          label:
            "Biaya pembangunan jalan layang di Kota P ternyata lebih rendah daripada perkiraan awal.",
        },
        {
          correct: false,
          label:
            "Sebagian besar kendaraan di persimpangan tersibuk Kota Q berbelok ke pasar yang berada tepat di sudut persimpangan itu, bukan melintas lurus.",
        },
        {
          correct: false,
          label:
            "Waktu tempuh melewati persimpangan tersibuk Kota P memang turun setelah jalan layangnya dibuka.",
        },
      ],
    },
  },
};

export default item;
