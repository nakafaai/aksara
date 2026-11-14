import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "loan-plans",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Cicilan bulanan Rencana Menurun mulai lebih kecil daripada cicilan Rencana Tetap pada bulan ketujuh.",
        },
        {
          column: 1,
          label:
            "Jika bunga Rencana Menurun diubah menjadi $$1{,}8\\%$$ dari sisa pokok, total bunga selama $$12$$ bulan pada Rencana Menurun lebih kecil daripada pada Rencana Tetap.",
        },
        {
          column: 1,
          label:
            "Selama enam bulan pertama, total bunga Rencana Menurun lebih besar $$\\text{Rp}420{.}000{,}00$$ daripada total bunga Rencana Tetap.",
        },
        {
          column: 2,
          label:
            "Jika pokok pinjaman dinaikkan menjadi $$\\text{Rp}18{.}000{.}000{,}00$$, selisih total biaya kedua rencana menjadi $$1{,}5$$ kali selisih semula.",
        },
      ],
    },
  },
};

export default item;
