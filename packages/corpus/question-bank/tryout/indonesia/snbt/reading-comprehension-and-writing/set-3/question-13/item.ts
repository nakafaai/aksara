import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "lapak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "warga yang sebelumnya membeli ikan dari pedagang keliling",
        },
        {
          correct: false,
          label: "semua pedagang keliling yang dulu didatangi warga",
        },
        {
          correct: false,
          label: "pedagang lama pasar yang lapaknya diperiksa setiap pagi",
        },
        {
          correct: true,
          label:
            "pedagang keliling yang kehilangan pelanggan lalu menyewa lapak di dalam pasar",
        },
        {
          correct: false,
          label: "pedagang keliling yang tetap berjualan dengan berkeliling",
        },
      ],
    },
  },
};

export default item;
