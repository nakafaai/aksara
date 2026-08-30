import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Seit Januar " },
            { display: "block", kind: "math", math: "1941" },
            {
              kind: "text",
              text: " wurden in Cukurgondang Mango-Akzessionen angepflanzt, und die Anlage umfasste ",
            },
            { display: "block", kind: "math", math: "11{,}87" },
            { kind: "text", text: " Hektar." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Nationale Mango-Innovationswoche fand am IP2TP Cukurgondang in Pasuruan, Ostjava, statt.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Bäuerliche Betriebe in Pasuruan bauten jede Akzession der Cukurgondang-Sammlung an.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Das Ministerium bezeichnete Cukurgondang als zweitgrößte Mangosammlung der Welt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Veranstaltung diente der Verbreitung von Mangoforschung und -technologie.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mango accessions had been planted at Cukurgondang since January ",
            },
            { display: "block", kind: "math", math: "1941" },
            { kind: "text", text: ", and the site covered " },
            { display: "block", kind: "math", math: "11.87" },
            { kind: "text", text: " hectares." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "National Mango Innovation Week was held at IP2TP Cukurgondang in Pasuruan, East Java.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Community plantations in Pasuruan cultivated every accession in the Cukurgondang collection.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The ministry described Cukurgondang as the world's second-largest mango collection.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The event served to disseminate mango research and technology.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Aksesi mangga telah ditanam di Cukurgondang sejak Januari ",
            },
            { display: "block", kind: "math", math: "1941" },
            { kind: "text", text: ", dan luas kebunnya " },
            { display: "block", kind: "math", math: "11{,}87" },
            { kind: "text", text: " hektare." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pekan Inovasi Mangga Nasional diselenggarakan di IP2TP Cukurgondang, Pasuruan, Jawa Timur.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Perkebunan rakyat di Pasuruan membudidayakan setiap aksesi dalam koleksi Cukurgondang.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kementerian menyebut Cukurgondang sebagai kebun koleksi mangga terbesar kedua di dunia.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kegiatan tersebut menjadi sarana untuk menyebarluaskan penelitian dan teknologi mangga.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
