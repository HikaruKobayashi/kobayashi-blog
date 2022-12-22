import { client } from "../../../libs/client";

export const getSearchBlogs = async (req: any, res: any) => {
  const keyword = req.query.keyword;
  const response = await client.get({
    endpoint: "blog",
    queries: {
      q: decodeURI(keyword),
    },
  });
  return res.status(200).json(response);
};

export default getSearchBlogs;
