import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  stimulus: "lost-girl",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Arif lupa membeli gula dan telur yang dipesan kakaknya",
        },
        {
          correct: true,
          label:
            "Arif merelakan waktunya untuk menolong anak yang tersesat, meskipun akibatnya ia sempat dimarahi kakaknya",
        },
        {
          correct: false,
          label: "Mbak Sari menolak pesanan kue dari tetangga",
        },
        {
          correct: false,
          label:
            "ibu Nisa memarahi Arif karena membawa anaknya ke pos keamanan",
        },
        {
          correct: false,
          label: "Arif tersesat di pasar dan diantar pulang oleh petugas",
        },
      ],
    },
  },
};

export default item;
