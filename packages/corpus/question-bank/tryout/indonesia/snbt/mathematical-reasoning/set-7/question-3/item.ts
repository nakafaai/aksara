import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "home-internet",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Kecepatan 40 Mbps sama dengan 5 MB per detik." },
        {
          column: 2,
          label:
            "Internet itu cukup untuk 14 perangkat yang menonton video HD bersamaan.",
        },
        {
          column: 2,
          label:
            "Dengan seluruh kecepatan 40 Mbps, berkas berukuran 2 GB terunduh dalam waktu kurang dari 6 menit.",
        },
        {
          column: 1,
          label:
            "Jika kecepatan internet dinaikkan menjadi 100 Mbps, waktu unduh setiap berkas berkurang $$60\\%$$.",
        },
      ],
    },
  },
};

export default item;
