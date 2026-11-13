import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "lumbung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "turunnya jumlah rumah tangga anggota yang berutang kepada tengkulak selama dua tahun lumbung berjalan",
        },
        {
          correct: false,
          label: "turunnya jumlah rumah tangga di seluruh desa yang berutang kepada tengkulak justru ketika harga beras sedang naik",
        },
        {
          correct: false,
          label: "berkurangnya besar utang setiap rumah tangga anggota kepada tengkulak justru ketika harga beras sedang naik",
        },
        {
          correct: true,
          label: "turunnya jumlah rumah tangga anggota yang berutang kepada tengkulak justru ketika harga beras sedang naik",
        },
        {
          correct: false,
          label: "pinjaman gabah dari lumbung yang membuat warga tidak lagi bergantung pada tengkulak",
        },
      ],
    },
  },
};

export default item;
