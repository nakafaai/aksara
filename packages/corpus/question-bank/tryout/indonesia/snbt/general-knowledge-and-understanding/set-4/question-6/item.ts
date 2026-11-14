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
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengamat yang melihat bulan tepat di atas kepala berada lebih dekat ke bulan daripada ketika bulan di cakrawala.",
        },
        {
          correct: false,
          label:
            "Pembelokan cahaya oleh udara mengubah tinggi piringan bulan yang rendah, tetapi hampir tidak mengubah lebarnya.",
        },
        {
          correct: false,
          label:
            "Kamera dapat merekam perbedaan lebar antara purnama di titik terdekat dan purnama di titik terjauh.",
        },
        {
          correct: false,
          label:
            "Ilusi tentang ukuran benda langit yang rendah tidak hanya dilaporkan pada bulan.",
        },
        {
          correct: true,
          label:
            "Menurut salah satu penjelasan, bulan di cakrawala tampak besar karena otak merasakannya lebih dekat daripada bulan yang tinggi.",
        },
      ],
    },
  },
};

export default item;
