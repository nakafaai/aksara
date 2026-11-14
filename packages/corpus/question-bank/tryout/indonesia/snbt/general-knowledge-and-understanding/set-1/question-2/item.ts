import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "mikoriza",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Fosfor yang diterima tanaman bermikoriza dapat berasal dari pori tanah yang terlalu sempit untuk dimasuki akarnya, walaupun fosfor sangat lambat berpindah di dalam tanah.",
        },
        {
          column: 2,
          label:
            "Jika dua tanaman sejenis tumbuh di tanah yang miskin fosfor dan salah satunya tumbuh lebih baik, tanaman yang tumbuh lebih baik itulah yang bermikoriza.",
        },
        {
          column: 2,
          label:
            "Pembajakan tanah merugikan mikoriza hanya di lahan yang kaya fosfor.",
        },
        {
          column: 1,
          label:
            "Di lahan kaya fosfor yang tidak pernah dibajak pun, pupuk hayati mikoriza belum tentu memberikan hasil yang terlihat.",
        },
      ],
    },
  },
};

export default item;
