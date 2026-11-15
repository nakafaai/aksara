import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "balai-pustaka",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Daftar naskah yang ditolak Balai Pustaka karena dinilai memuat kritik terhadap pemerintah kolonial.",
        },
        {
          correct: false,
          label:
            "Data bahwa buku Balai Pustaka dijual jauh lebih murah daripada novel-novel pergerakan pada masa yang sama.",
        },
        {
          correct: false,
          label:
            "Laporan bahwa Taman Pustaka paling banyak didirikan di kota kecil yang tidak punya toko buku.",
        },
        {
          correct: true,
          label:
            "Surat pejabat kolonial yang menyebut perluasan Taman Pustaka sebagai cara menekan peredaran bacaan liar.",
        },
        {
          correct: false,
          label:
            "Catatan bahwa Balai Pustaka juga menerbitkan buku pertanian dan kesehatan dalam berbagai bahasa daerah.",
        },
      ],
    },
  },
};

export default item;
