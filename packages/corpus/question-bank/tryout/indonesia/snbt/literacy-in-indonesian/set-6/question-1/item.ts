import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "el-nino-drought",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menunjukkan bahwa El Nino bukan satu-satunya jalan menuju kemarau parah sekaligus mengantar pembaca ke pembahasan Dipole Samudra Hindia.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa pengaruh El Nino terhadap hujan di Indonesia terlalu lemah untuk diperhitungkan dalam perencanaan daerah.",
        },
        {
          correct: false,
          label:
            "Menjelaskan mengapa pengaruh El Nino melemah pada puncak musim hujan, ketika angin monsun membawa banyak uap air.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa prakiraan peluang El Nino sering meleset sehingga sebaiknya tidak dijadikan dasar persiapan.",
        },
        {
          correct: false,
          label:
            "Menegaskan bahwa kemarau parah lebih sering terjadi pada tahun tanpa El Nino daripada pada tahun El Nino.",
        },
      ],
    },
  },
};

export default item;
