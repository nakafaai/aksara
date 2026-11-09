import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "remote-work",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "semua karyawan sebaiknya bekerja di kantor lima hari seminggu",
        },
        {
          correct: true,
          label: "kerja dari rumah membawa manfaat bagi sebagian pekerja",
        },
        {
          correct: false,
          label:
            "karyawan baru belajar paling banyak dari pelatihan lewat layar",
        },
        {
          correct: false,
          label:
            "perusahaan sebaiknya hanya merekrut orang dari kota yang sama",
        },
        {
          correct: false,
          label:
            "rapat dadakan adalah cara terbaik untuk menyelesaikan laporan",
        },
      ],
    },
  },
};

export default item;
