import axios from "axios";
import express from "express";
import _ from "lodash";
import cors from "cors";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  let wb_api = await axios.get(
    "https://search.wb.ru/exactmatch/ru/common/v4/search",
    {
      params: {
        query: req.query.name,
        resultset: "catalog",
        dest: "80,64,83,4,38,33,70,68,69,86,30,40,48,1,66,31,22",
        suppressSpellcheck: false,
      },
    }
  );
  let brands = [];
  wb_api.data.data !== undefined
    ? wb_api.data.data.products.map((product) => {
        return brands.push(product.brand);
      })
    : null;
  brands = _.uniq(brands);
  res.send(brands);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
