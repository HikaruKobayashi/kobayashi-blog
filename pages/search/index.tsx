import { ReactElement, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { css } from "@emotion/react";
import { mqMax, mqMin } from "./../../styles/media-queries";
import type { Blog } from "./../../types/blog";
import Layout from "./../../layout/main";
import Card from "./../../components/blog/card";
import SearchForm from "../../components/common/search-form";

const SearchHome = () => {
  const router = useRouter();
  const queryParameter = router.query.q;

  const [results, setResults] = useState([]);

  const handleSeachBlog = async (keyword: string) => {
    const response = await axios.get("/api/blog", {
      params: { keyword },
    });
    setResults(response.data.contents);
  };

  useEffect(() => {
    if (router.isReady) {
      handleSeachBlog(String(queryParameter));
    }
  }, [router, queryParameter]);

  return (
    <main css={styles.container}>
      <div css={styles.wrapper}>
        <SearchForm />
        {results.length !== 0 && (
          <ul css={styles.contents}>
            {results.map((blog: Blog) => (
              <li css={styles.item} key={blog.id}>
                <Card blog={blog} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

const styles = {
  container: css`
    margin: 0 auto 20px;
    ${mqMax("md")} {
      padding: 0 10px;
    }
    ${mqMin("md")} {
      width: 70%;
    }
  `,
  wrapper: css`
    ${mqMin("md")} {
      min-width: 380px;
    }
    ${mqMin("lg")} {
      min-width: 450px;
    }
  `,
  contents: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    margin-top: 20px;
  `,
  item: css`
    width: calc(50% - 5px);
    margin-bottom: 40px;
    &:last-child,
    &:nth-last-of-type(2) {
      margin-bottom: 0;
    }
    ${mqMin("md")} {
      width: calc(50% - 10px);
    }
  `,
};

export default SearchHome;

SearchHome.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
