import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "surya",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebagian besar warga kelima desa mengatakan bahwa mereka merasa lebih aman keluar rumah pada malam hari sejak lampu dipasang.",
        },
        {
          correct: false,
          label:
            "Di desa-desa yang tidak menerima lampu, banyaknya pencurian sepeda motor pada malam hari pada 2025 hampir sama dengan pada 2024.",
        },
        {
          correct: false,
          label:
            "Pada 2025, pencurian sepeda motor pada siang hari di kelima desa itu juga turun dengan persentase yang hampir sama.",
        },
        {
          correct: false,
          label:
            "Beberapa pencuri yang tertangkap pada 2025 mengaku lebih suka beraksi di jalan yang gelap.",
        },
        {
          correct: true,
          label:
            "Di tiga desa yang lampunya banyak padam lewat tengah malam, banyaknya pencurian sepeda motor pada malam hari pada 2025 hampir sama dengan pada 2024.",
        },
      ],
    },
  },
};

export default item;
