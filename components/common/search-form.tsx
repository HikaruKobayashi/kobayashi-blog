import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";

const SearchForm = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");

  const updateInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== 13 || keyword === "") {
      return;
    }
    router.push({
      pathname: "/search",
      query: { q: keyword },
    });
  };

  return (
    <div css={styles.formContainer}>
      <IconContext.Provider value={{ size: "20px", color: "#2c3e50" }}>
        <AiOutlineSearch />
      </IconContext.Provider>
      <input
        type="text"
        placeholder="enterで検索"
        css={styles.form}
        onChange={updateInputValue}
        onKeyDown={onKeydown}
      />
    </div>
  );
};

const styles = {
  formContainer: css`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 22px;
    margin: auto;
  `,
  form: css`
    width: 150px;
    height: 25px;
    outline: none;
    border: none;
    flex-grow: 1;
  `,
};

export default SearchForm;
