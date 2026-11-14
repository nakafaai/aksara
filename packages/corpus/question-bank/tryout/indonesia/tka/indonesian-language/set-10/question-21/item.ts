import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "loud-exhaust",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "semua sepeda motor di Jalan Cendana melanggar batas kebisingan",
        },
        {
          correct: false,
          label: "petugas melarang sepeda motor melintas pada malam hari",
        },
        {
          correct: false,
          label: "kebisingan hanya membuat orang merasa tidak nyaman",
        },
        {
          correct: false,
          label: "kepolisian sudah menilang 18 pengendara di Jalan Cendana",
        },
        {
          correct: true,
          label:
            "kebisingan knalpot yang diubah mengganggu warga, dan warga menanggapinya dengan pengukuran serta langkah bersama",
        },
      ],
    },
  },
};

export default item;
