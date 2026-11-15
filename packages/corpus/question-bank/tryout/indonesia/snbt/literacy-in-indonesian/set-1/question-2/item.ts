import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "temple-moss",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dalam uji coba itu, kelompok yang mengalami lebih banyak siklus basah kering per tahun juga kehilangan permukaan lebih banyak.",
        },
        {
          column: 2,
          label:
            "Lumut pada panel kelompok III menyebabkan retakan dalam yang ditemukan di bawah lapisan lumut tebal.",
        },
        {
          column: 1,
          label:
            "Membiarkan lumut mati rontok sendiri menghasilkan kehilangan permukaan yang lebih kecil daripada menggosoknya.",
        },
        {
          column: 2,
          label:
            "Hasil uji coba itu berlaku untuk candi andesit di daerah beriklim apa pun.",
        },
        {
          column: 1,
          label:
            "Undian di setiap sisi dinding membuat perbedaan paparan matahari antarsisi sulit dijadikan penjelasan atas selisih hasil antarkelompok.",
        },
      ],
    },
  },
};

export default item;
