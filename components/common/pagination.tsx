import Link from "next/link";
import { css } from "@emotion/react";
import { IconContext } from "react-icons";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Pagination = ({
  totalCount,
  currentPage,
}: {
  totalCount: number;
  currentPage: number;
}) => {
  const PER_PAGE = 8;

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const maxPage = Math.ceil(totalCount / PER_PAGE);

  let prevPage = Number(currentPage) - 1;
  if (prevPage === 0) {
    prevPage = currentPage;
  }

  let NextPage;
  if (currentPage < maxPage) {
    NextPage = Number(currentPage) + 1;
  } else {
    NextPage = currentPage;
  }

  return (
    <ul css={styles.container}>
      <li css={styles.wrapper}>
        <Link href={`/blog/page/${prevPage}`}>
          <div css={styles.paginationItem}>
            <IconContext.Provider value={{ size: "12px", color: "#333" }}>
              <AiOutlineLeft />
            </IconContext.Provider>
          </div>
        </Link>
      </li>
      {range(1, maxPage).map((number, index) => (
        <li css={styles.wrapper} key={index}>
          <Link href={`/blog/page/${number}`}>
            <p css={styles.paginationItem}>{number}</p>
          </Link>
        </li>
      ))}
      <li css={styles.wrapper}>
        <Link href={`/blog/page/${NextPage}`}>
          <div css={styles.paginationItem}>
            <IconContext.Provider value={{ size: "12px", color: "#333" }}>
              <AiOutlineRight />
            </IconContext.Provider>
          </div>
        </Link>
      </li>
    </ul>
  );
};

const styles = {
  container: css`
    display: flex;
    list-style: none;
    justify-content: center;
    margin: 20px 0;
  `,
  wrapper: css`
    margin-right: 5px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
  `,
  paginationItem: css`
    text-decoration: none;
    font-size: 12px;
    color: #333;
    border-radius: 6px;
    background-color: #ddd;
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      opacity: 0.75;
    }
  `,
};

export default Pagination;
