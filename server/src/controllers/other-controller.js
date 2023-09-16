const Group = require("../models/group-test");
const Client = require("../models/client");
const Individual = require("../models/individual");
const Article = require("../models/article");

module.exports = {
  //Article Controller
  newArticle: async (req, res) => {
    try {
      await new Article(req.body).save();
      res.status(201).json({ message: "Artikel Baru Berhasil Ditambahkan" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Terjadi Kesalahan pada Server" });
    }
  },

  getAllArticle: async (res) => {
    try {
      const article = await Article.find();
      res.status(200).send(article);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Terjadi Kesalahan pada Server" });
    }
  },

  //Delete All Data Controller
  deleteAllTestData: async (res) => {
    try {
      await Group.deleteMany({});
      await Client.deleteMany({});
      await Individual.deleteMany({});
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Terjadi Kesalahan pada Server" });
    }
  },

  //Search Data Controller
  searchAllTestData: async (req, res) => {
    try {
      const { name } = req.query;

      const client = await Client.find({ name: { $regex: name } }).sort({
        totalErrorScore: 1,
        time: 1,
      });

      const clientSearchResult = client.map((key) => {
        const name = key.name;
        const date = key.date;
        const score = key.totalErrorScore;
        const time = key.time;
        const blindCheck = key.blindCheck;
        const status = key.status;
        return {
          name: name,
          date: date,
          score: score,
          time: time,
          blindCheck: blindCheck,
          status: status,
        };
      });

      const individual = await Individual.find({
        name: { $regex: name },
      }).sort({
        totalErrorScore: 1,
        time: 1,
      });

      const individualSearchResult = individual.map((key) => {
        const name = key.name;
        const date = key.date;
        const score = key.totalErrorScore;
        const blindCheck = key.blindCheck;
        const status = key.errorScoreStatus;
        return {
          name: name,
          date: date,
          score: score,
          blindCheck: blindCheck,
          status: status,
        };
      });

      const group = await Group.find({ groupName: { $regex: name } }).sort({
        date: 1,
      });

      const groupSearchResult = group.map((key) => {
        const name = key.groupName;
        const initial = key.groupInitial;
        const date = key.date;
        const score = key.maxScore;
        const type = key.type;
        const clients = key.clients.length;
        return {
          name: name,
          initial: initial,
          date: date,
          score: score,
          type: type,
          clients: clients,
        };
      });

      const searchResult = {
        client: clientSearchResult,
        individual: individualSearchResult,
        room: groupSearchResult,
      };

      res.status(200).send(searchResult);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Terjadi Kesalahan pada Server" });
    }
  },
};
