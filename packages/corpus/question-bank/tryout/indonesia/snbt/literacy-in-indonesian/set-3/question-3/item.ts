import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "mangrove-carbon",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bibit dari pohon mangrove di sekitarnya dapat tumbuh sendiri di bekas tambak itu.",
        },
        {
          correct: false,
          label:
            "Karbon di tanah bekas tambak itu kemungkinan lebih cepat terlepas ke atmosfer.",
        },
        {
          correct: false,
          label:
            "Bekas tambak itu harus ditanami satu jenis mangrove secara rapat agar pulih.",
        },
        {
          correct: false,
          label:
            "Air pasang akan menenggelamkan dan mematikan hutan mangrove di sekitarnya.",
        },
        {
          correct: false,
          label:
            "Bekas tambak itu mungkin baru pulih jika ditanami bibit dalam jumlah besar.",
        },
      ],
    },
  },
};

export default item;
