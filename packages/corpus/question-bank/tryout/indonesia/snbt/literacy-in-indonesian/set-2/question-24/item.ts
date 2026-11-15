import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "botanic-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Penulis menerima sebutan itu sepenuhnya, karena kisah kelapa sawit membuktikan bahwa kebun itu sejak awal dibangun untuk kepentingan perkebunan." },
        { correct: false, label: "Penulis menolak sebutan itu sepenuhnya, karena kebun itu sejak awal dibangun untuk penelitian ilmiah murni." },
        { correct: true, label: "Penulis menerima sebutan itu untuk sebagian kegiatan, tetapi menilainya mengabaikan penelitian tumbuhan yang tidak punya nilai dagang." },
        { correct: false, label: "Penulis menerima sebutan itu untuk sebagian kegiatan, tetapi menilainya tidak berlaku karena kelapa sawit gagal tumbuh." },
        { correct: false, label: "Penulis tidak menanggapi sebutan itu dan hanya melaporkan pendapat para sejarawan." },
      ],
    },
  },
};

export default item;
