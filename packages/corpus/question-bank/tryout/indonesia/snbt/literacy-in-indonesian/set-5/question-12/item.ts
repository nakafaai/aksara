import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "mountain-quota",
  versions: {
    id: {
      columns: ["Teks A", "Teks B"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kerugian ekonomi yang muncul sekarang layak ditanggung demi mencegah kerugian yang lebih besar nanti.",
        },
        {
          column: 2,
          label:
            "Aturan yang adil bagi gunung belum tentu adil bagi orang yang hidup di lerengnya.",
        },
        {
          column: 1,
          label:
            "Jalur yang kosong pada hari kerja menunjukkan bahwa kuota masih menyisakan ruang bagi pendaki yang tidak kebagian tempat.",
        },
        {
          column: 2,
          label:
            "Siapa yang mendapat tempat sama pentingnya dengan berapa banyak tempat yang tersedia.",
        },
        {
          column: 2,
          label:
            "Usul yang baik di atas kertas dapat gagal karena mengabaikan keadaan orang yang diharapkan menjalankannya.",
        },
      ],
    },
  },
};

export default item;
