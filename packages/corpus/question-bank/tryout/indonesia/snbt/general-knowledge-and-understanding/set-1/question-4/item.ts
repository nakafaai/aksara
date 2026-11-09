import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "sentence-meaning",
    topic: "referent",
  },
  stimulus: "leuit",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Larangan memperjualbelikan padi dari leuit dan kebiasaan mengambilnya sesuai kebutuhan keluarga.",
        },
        {
          correct: false,
          label: "Kebiasaan menyimpan padi dalam bentuk ikatan bertangkai.",
        },
        {
          correct: false,
          label: "Cara membangun leuit di atas kolong yang dialiri udara.",
        },
        {
          correct: false,
          label: "Kewajiban menggiling padi segera setelah panen.",
        },
        {
          correct: false,
          label:
            "Pembagian padi dari leuit secara merata kepada seluruh warga kampung ketika musim paceklik datang.",
        },
      ],
    },
  },
};

export default item;
