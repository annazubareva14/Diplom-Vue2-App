const counter = {
  data() {
    return { count: 1 };
  },

  methods: {
    add() {
      this.count++;
    },
  },
};

export default counter;


