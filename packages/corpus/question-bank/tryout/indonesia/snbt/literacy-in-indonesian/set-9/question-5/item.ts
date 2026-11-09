import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "peat-fire",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "membuktikan bahwa kebakaran gambut hanya terjadi di Indonesia",
        },
        {
          correct: true,
          label: "menunjukkan betapa luas dampak asap dari kebakaran gambut",
        },
        {
          correct: false,
          label: "menjelaskan cara gambut terbentuk selama ribuan tahun",
        },
        {
          correct: false,
          label: "menyalahkan negara tetangga atas kabut asap yang terjadi",
        },
        {
          correct: false,
          label:
            "menyarankan agar kanal-kanal baru segera digali di lahan gambut",
        },
      ],
    },
  },
};

export default item;
