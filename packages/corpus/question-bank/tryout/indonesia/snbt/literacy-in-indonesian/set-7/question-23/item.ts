import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "rumah-gadang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pasak kayu lebih murah daripada paku, sehingga rumah gadang dapat dibangun oleh seluruh anggota kaum.",
        },
        {
          correct: false,
          label:
            "Pasak kayu membuat sambungan sama sekali tidak dapat bergerak, sehingga rumah tetap tegak saat tanah berguncang.",
        },
        {
          correct: false,
          label:
            "Paku tidak dikenal masyarakat Minangkabau ketika rumah gadang pertama kali dibangun.",
        },
        {
          correct: false,
          label:
            "Pasak kayu membuat tiang tertanam lebih dalam ke tanah, sehingga rumah tidak bergeser dari tempatnya.",
        },
        {
          correct: true,
          label:
            "Sambungan pasak dapat bergerak sedikit tanpa patah, sehingga sebagian guncangan diredam alih-alih ditahan seluruhnya.",
        },
      ],
    },
  },
};

export default item;
