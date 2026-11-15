import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "shorebird-flyway",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "membuktikan bahwa burung pantai sanggup melewati persinggahan yang hilang, diperkuat keterangan bahwa jalur itu melintasi dua puluh dua negara",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa jalur itu lebih panjang daripada jalur migrasi lain, diperkuat keterangan bahwa lebih dari lima puluh juta burung memakainya",
        },
        {
          correct: false,
          label:
            "menegaskan bahwa burung yang singgah di Indonesia juga terbang tanpa mendarat, diperkuat keterangan tentang hitungan di muara Sumatra",
        },
        {
          correct: true,
          label:
            "menegaskan bahwa kemampuan satu jenis tidak dapat dijadikan dasar untuk burung lain, diperkuat keterangan bahwa sebagian besar jenis menempuh jalur itu sebagai rangkaian lompatan dengan beberapa persinggahan",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa burung muda lebih tahan daripada burung dewasa, diperkuat keterangan bahwa burung itu dipasangi pemancar satelit",
        },
      ],
    },
  },
};

export default item;
