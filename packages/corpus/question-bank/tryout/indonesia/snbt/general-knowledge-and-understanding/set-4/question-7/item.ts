import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "purnama",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Bulan di cakrawala sedikit lebih kecil di mata daripada bulan yang tepat di atas kepala.",
        },
        {
          column: 2,
          label:
            "Lapisan udara di dekat cakrawala membuat piringan bulan yang rendah tampak sedikit lebih lebar.",
        },
        {
          column: 2,
          label:
            "Para ahli sepakat bahwa ilusi bulan terjadi karena otak salah menafsirkan jarak bulan yang rendah.",
        },
        {
          column: 1,
          label:
            "Perbedaan lebar purnama akibat bentuk orbit bulan lebih besar daripada perbedaan ukuran bulan akibat letaknya di langit, tetapi tidak mudah disadari.",
        },
      ],
    },
  },
};

export default item;
